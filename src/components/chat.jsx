import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageSquare,
  Send,
  Code2,
  CheckCheck,
  Sparkles,
  Copy,
  Check,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { getSocket } from "../utils/socket";
import { setUserOnline } from "../utils/presenceSlice";
import { addConnection } from "../utils/connectionSlice";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80";

const CHAT_BUTTON_CLASS =
  "w-full sm:w-auto sm:min-w-28 whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:brightness-110 active:scale-95 transition";

const QUICK_MESSAGES = [
  {
    label: "🚀 Spin up Git repo",
    text: "Let's spin up a Git repo and start shipping! 🚀",
    hoverColor: "hover:text-pink-300",
  },
  {
    label: "💻 Review PR diff",
    text: "Reviewing your pull request on the auth pipeline 💻",
    hoverColor: "hover:text-cyan-300",
  },
  {
    label: "⚡ Audio pair session",
    text: "Let's jump on a 15-min audio huddle to pair! ⚡",
    hoverColor: "hover:text-purple-300",
  },
];

// Fenced ``` blocks become the message's code snippet, the rest stays as text
const CODE_FENCE = /```[^\n`]*\n?([\s\S]*?)```/g;

const parseDraft = (draft) => {
  const blocks = [...draft.matchAll(CODE_FENCE)].map((match) =>
    match[1].trimEnd(),
  );
  return {
    text: draft.replace(CODE_FENCE, "").trim(),
    code: blocks.filter(Boolean).join("\n\n"),
  };
};

// Replaces the optimistic copy of a message once the server confirms it
const upsertMessage = (list, incoming) => {
  const isSame = (msg) =>
    msg._id === incoming._id ||
    (incoming.clientId && msg.clientId === incoming.clientId);
  const index = list.findIndex(isSame);
  if (index === -1) return [...list, { ...incoming, status: "sent" }];
  const confirmed = {
    ...incoming,
    status: "sent",
    // Don't lose a read receipt that arrived before this copy
    seenAt: incoming.seenAt || list[index].seenAt || null,
  };
  return list.flatMap((msg, i) =>
    i === index ? [confirmed] : isSame(msg) ? [] : [msg],
  );
};

// Server history wins over local copies; local-only messages are kept
const mergeHistory = (list, history) => {
  const historyIds = new Set(history.map((msg) => msg._id));
  return [
    ...history.map((msg) => ({ ...msg, status: "sent" })),
    ...list.filter((msg) => !historyIds.has(msg._id)),
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

// The reader has seen every message sent to them up to seenAt
const markMessagesSeen = (list, readerId, seenAt) =>
  list.map((msg) =>
    msg.status === "sent" &&
    !msg.seenAt &&
    msg.senderId !== readerId &&
    new Date(msg.createdAt) <= new Date(seenAt)
      ? { ...msg, seenAt }
      : msg,
  );

// Must match the server's room id so events from other chats are ignored
const getRoomId = (userId, targetUserId) =>
  [String(userId), String(targetUserId)].sort().join("-");

const createClientId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatRoom = ({ targetUserId }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection) || [];
  const onlineUsers = useSelector((store) => store.presence);
  const userId = user?._id;
  const isPeerOnline = onlineUsers.includes(targetUserId);

  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "connections"
  const [chatStatus, setChatStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [chatError, setChatError] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [isPeerTyping, setIsPeerTyping] = useState(false);

  const socketRef = useRef(null);
  const messageListRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const lastTypingSentRef = useRef(-Infinity);

  // Load the chat partner and message history
  useEffect(() => {
    if (!userId) return;
    let ignore = false;

    axios
      .get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true })
      .then((res) => {
        if (ignore) return;
        setTargetUser(res.data.targetUser);
        // Keep anything the socket delivered while history was loading
        setMessages((prev) => mergeHistory(prev, res.data.messages));
        setChatStatus("ready");
      })
      .catch((error) => {
        if (ignore) return;
        const data = error.response?.data;
        setChatError(
          typeof data === "string" ? data : "Unable to load this conversation.",
        );
        setChatStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [userId, targetUserId]);

  // All connections power the "Connections" tab
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/connection`, { withCredentials: true })
      .then((res) => dispatch(addConnection(res.data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  // Real-time chat on the shared session socket (opened in Body)
  useEffect(() => {
    if (!userId) return;
    const socket = getSocket();
    socketRef.current = socket;
    const roomId = getRoomId(userId, targetUserId);
    let peerTypingTimeout;
    let isFirstJoin = true;

    const joinChat = () => {
      // Rooms are lost on reconnect, so join again on every connect
      socket.emit("joinChat", { targetUserId }, (res) => {
        if (!res?.ok) return;
        setIsJoined(true);
        dispatch(setUserOnline({ userId: targetUserId, online: res.online }));
      });

      // Catch up on messages and read receipts missed while disconnected
      if (!isFirstJoin) {
        axios
          .get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true })
          .then((res) =>
            setMessages((prev) => mergeHistory(prev, res.data.messages)),
          )
          .catch((error) => console.log(error));
      }
      isFirstJoin = false;
    };

    const handleDisconnect = () => setIsJoined(false);

    // The shared socket can carry events for other chats, so filter by room
    const handleMessage = (message) => {
      if (message.roomId !== roomId) return;
      setMessages((prev) => upsertMessage(prev, message));
      if (message.senderId === targetUserId) setIsPeerTyping(false);
    };

    const handleSeen = ({ roomId: seenRoomId, readerId, seenAt }) => {
      if (seenRoomId !== roomId) return;
      setMessages((prev) => markMessagesSeen(prev, readerId, seenAt));
    };

    const handlePresence = ({ userId: id, online }) => {
      if (id === targetUserId && !online) setIsPeerTyping(false);
    };

    const handleTyping = ({ userId: id, isTyping }) => {
      if (id !== targetUserId) return;
      setIsPeerTyping(isTyping);
      clearTimeout(peerTypingTimeout);
      // Clear the indicator even if the "stopped typing" event never arrives
      if (isTyping) {
        peerTypingTimeout = setTimeout(() => setIsPeerTyping(false), 3000);
      }
    };

    if (socket.connected) joinChat();
    socket.on("connect", joinChat);
    socket.on("disconnect", handleDisconnect);
    socket.on("messageReceived", handleMessage);
    socket.on("messagesSeen", handleSeen);
    socket.on("presence", handlePresence);
    socket.on("typing", handleTyping);

    return () => {
      clearTimeout(peerTypingTimeout);
      // The socket stays open for the session, so only leave this chat
      socket.emit("leaveChat", { targetUserId });
      socket.off("connect", joinChat);
      socket.off("disconnect", handleDisconnect);
      socket.off("messageReceived", handleMessage);
      socket.off("messagesSeen", handleSeen);
      socket.off("presence", handlePresence);
      socket.off("typing", handleTyping);
      socketRef.current = null;
    };
  }, [userId, targetUserId, dispatch]);

  useEffect(() => {
    const handleVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Messages only count as seen while the chat is actually on screen
  const canMarkSeen =
    isJoined && isPageVisible && chatStatus === "ready" && activeTab === "chat";
  const lastUnseenPeerMessageId = messages.findLast(
    (msg) => msg.senderId === targetUserId && !msg.seenAt,
  )?._id;

  useEffect(() => {
    if (canMarkSeen && lastUnseenPeerMessageId) {
      socketRef.current?.emit("markSeen", { targetUserId });
    }
  }, [canMarkSeen, lastUnseenPeerMessageId, targetUserId]);

  // Keep the newest message in view
  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isPeerTyping, activeTab, chatStatus]);

  const emitTyping = (isTyping) => {
    socketRef.current?.emit("typing", { targetUserId, isTyping });
  };

  const stopTyping = () => {
    clearTimeout(typingTimeoutRef.current);
    lastTypingSentRef.current = -Infinity;
    emitTyping(false);
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    // Re-send "typing" at most every 2s so the peer's indicator stays on
    if (e.timeStamp - lastTypingSentRef.current > 2000) {
      emitTyping(true);
      lastTypingSentRef.current = e.timeStamp;
    }
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(stopTyping, 1500);
  };

  const sendMessage = ({ text, code }) => {
    const socket = socketRef.current;
    const clientId = createClientId();

    setMessages((prev) => [
      ...prev,
      {
        _id: clientId,
        clientId,
        senderId: userId,
        text,
        code,
        createdAt: new Date().toISOString(),
        status: "sending",
      },
    ]);

    const markFailed = () =>
      setMessages((prev) =>
        prev.map((msg) =>
          msg.clientId === clientId && msg.status === "sending"
            ? { ...msg, status: "failed" }
            : msg,
        ),
      );

    if (!socket?.connected || !isJoined) {
      markFailed();
      return;
    }

    socket
      .timeout(10000)
      .emit(
        "sendMessage",
        { targetUserId, text, code, clientId },
        (err, res) => {
          if (err || !res?.ok) {
            markFailed();
            return;
          }
          setMessages((prev) => upsertMessage(prev, res.message));
        },
      );
  };

  const handleSendMessage = (textToSend) => {
    const { text, code } = parseDraft(textToSend ?? inputVal);
    if (!text && !code) return;

    sendMessage({ text, code });
    if (textToSend === undefined) setInputVal("");
    stopTyping();
  };

  const handleRetry = (failedMsg) => {
    setMessages((prev) =>
      prev.filter((msg) => msg.clientId !== failedMsg.clientId),
    );
    sendMessage(failedMsg);
  };

  const handleFormatAsCode = () => {
    setInputVal((draft) =>
      draft.trim() && !draft.includes("```")
        ? `\`\`\`\n${draft}\n\`\`\``
        : draft,
    );
  };

  const handleCopy = (msgId, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId((id) => (id === msgId ? null : id)), 2000);
  };

  const peerName = targetUser
    ? `${targetUser.firstName} ${targetUser.lastName || ""}`.trim()
    : "Loading...";
  const peerAvatar = targetUser?.photoUrl || DEFAULT_AVATAR;
  const selfAvatar = user?.photoUrl || DEFAULT_AVATAR;
  const peerSkills = targetUser?.skills || [];
  const sharedSkills = peerSkills.filter((skill) =>
    user?.skills?.includes(skill),
  );

  const presenceBadge = !isJoined
    ? { label: "Connecting...", className: "bg-amber-500/20 text-amber-300" }
    : isPeerTyping
      ? { label: "Typing...", className: "bg-cyan-500/20 text-cyan-300" }
      : isPeerOnline
        ? {
            label: "Online & Active",
            className: "bg-emerald-500/20 text-emerald-300",
          }
        : { label: "Offline", className: "bg-white/10 text-slate-400" };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-4 sm:px-6 lg:px-8 bg-[#030614] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-pink-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Linear/VS Code Themed Container */}
      <div className="relative max-w-4xl mx-auto rounded-3xl glass-panel-glow border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Top Bar with Peer Metadata & Tabs */}
        <div className="bg-[#080d22] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Active Peer Metadata */}
          <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
            <div className="relative shrink-0">
              <img
                src={peerAvatar}
                alt={peerName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-500"
              />
              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-[#080d22] ${
                  isPeerOnline ? "bg-emerald-400" : "bg-slate-500"
                }`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white truncate">
                  {peerName}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${presenceBadge.className}`}>
                  {presenceBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate">
                {peerSkills.length > 0
                  ? peerSkills.slice(0, 3).join(" • ")
                  : "Developer"}
              </p>
            </div>
          </div>

          {/* Right: Tab Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === "chat"
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                  : "text-slate-400 hover:text-white"
              }`}>
              Code Chat
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("connections")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === "connections"
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}>
              Connections ({connections.length})
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === "chat" && chatStatus === "error" ? (
          <div className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-[#050818] h-[65vh] min-h-[460px]">
            <MessageSquare className="w-12 h-12 text-slate-600" />
            <h3 className="text-xl font-bold text-white">Chat Unavailable</h3>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              {chatError}
            </p>
            <Link
              to="/connections"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono font-bold text-xs shadow-lg shadow-pink-500/25">
              Back to Connections
            </Link>
          </div>
        ) : activeTab === "chat" ? (
          <div className="flex flex-col bg-[#050818] h-[65vh] min-h-[460px]">
            {/* Message Stream */}
            <div
              ref={messageListRef}
              className="flex-1 min-h-0 p-6 overflow-y-auto space-y-4">
              {/* System Match Pill */}
              <div className="flex items-center justify-center my-2">
                <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>
                    {sharedSkills.length > 0
                      ? `Match Confirmed: ${sharedSkills.length} Shared Skill${sharedSkills.length > 1 ? "s" : ""}`
                      : `Match Confirmed: You're connected with ${targetUser?.firstName || "this developer"}`}
                  </span>
                </div>
              </div>

              {chatStatus === "loading" && (
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-mono py-10">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading conversation...</span>
                </div>
              )}

              {chatStatus === "ready" && messages.length === 0 && (
                <div className="text-center text-slate-500 text-sm font-mono py-10">
                  No messages yet. Say hi to {targetUser?.firstName} 👋
                </div>
              )}

              {messages.map((msg) => {
                const isSelf = msg.senderId === userId;
                return (
                  <div
                    key={msg._id}
                    className={`flex gap-3 ${isSelf ? "justify-end" : "justify-start"}`}>
                    {!isSelf && (
                      <img
                        src={peerAvatar}
                        alt={peerName}
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                      />
                    )}

                    <div
                      className={`min-w-0 max-w-lg rounded-2xl p-4 text-xs sm:text-sm ${
                        isSelf
                          ? "bg-gradient-to-br from-pink-600/90 to-purple-600/90 text-white rounded-tr-none shadow-lg shadow-pink-600/20"
                          : "bg-[#0f1738] border border-white/10 text-slate-200 rounded-tl-none"
                      }`}>
                      {msg.text && (
                        <p className="leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                      )}

                      {/* Code Snippet Card */}
                      {msg.code && (
                        <div
                          className={`${msg.text ? "mt-3" : ""} rounded-xl bg-[#030611] border border-white/15 p-3 font-mono text-xs text-cyan-300 relative`}>
                          <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400 mb-2 pb-1 border-b border-white/10">
                            <span className="flex items-center gap-1.5">
                              <Code2 className="w-3 h-3" />
                              snippet
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(msg._id, msg.code)}
                              className="text-pink-400 hover:text-pink-300 flex items-center gap-1">
                              {copiedId === msg._id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>
                                {copiedId === msg._id ? "Copied" : "Copy"}
                              </span>
                            </button>
                          </div>
                          <pre className="overflow-x-auto text-[11px] leading-relaxed">
                            {msg.code}
                          </pre>
                        </div>
                      )}

                      <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] opacity-75 font-mono">
                        {msg.status === "failed" ? (
                          <button
                            type="button"
                            onClick={() => handleRetry(msg)}
                            className="flex items-center gap-1 text-rose-200 hover:text-white">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Not sent · Retry</span>
                          </button>
                        ) : (
                          <>
                            <span>{formatTime(msg.createdAt)}</span>
                            {isSelf &&
                              (msg.status === "sending" ? (
                                <Clock className="w-3.5 h-3.5 text-slate-200" />
                              ) : (
                                // Grey until the other person has seen it, then blue
                                <span
                                  title={
                                    msg.seenAt
                                      ? `Seen ${formatTime(msg.seenAt)}`
                                      : "Sent"
                                  }>
                                  <CheckCheck
                                    className={`w-3.5 h-3.5 ${
                                      msg.seenAt
                                        ? "text-cyan-300"
                                        : "text-white/50"
                                    }`}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>

                    {isSelf && (
                      <img
                        src={selfAvatar}
                        alt="You"
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                      />
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isPeerTyping && (
                <div className="flex gap-3 justify-start">
                  <img
                    src={peerAvatar}
                    alt={peerName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                  />
                  <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-[#0f1738] border border-white/10 flex items-center gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Interactive Presets Bar */}
            <div className="px-6 py-2.5 bg-[#080d22] border-t border-white/5 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">
                Quick Code:
              </span>
              {QUICK_MESSAGES.map((quick) => (
                <button
                  key={quick.label}
                  type="button"
                  disabled={chatStatus !== "ready"}
                  onClick={() => handleSendMessage(quick.text)}
                  className={`px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 ${quick.hoverColor} shrink-0 transition-colors disabled:opacity-50`}>
                  {quick.label}
                </button>
              ))}
            </div>

            {/* Bottom Interactive Message Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-[#070b1e] border-t border-white/10 flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  rows={Math.min(6, inputVal.split("\n").length)}
                  value={inputVal}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    // Enter sends, Shift+Enter adds a new line for code
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      !e.nativeEvent.isComposing
                    ) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={chatStatus !== "ready"}
                  placeholder="Type a message, or wrap code in ``` to share a snippet (Shift+Enter for new line)..."
                  className="block w-full resize-none bg-[#030612] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors disabled:opacity-60"
                />
              </div>

              <button
                type="button"
                onClick={handleFormatAsCode}
                disabled={chatStatus !== "ready"}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
                title="Format message as code block">
                <Code2 className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={chatStatus !== "ready"}
                className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                title="Send message">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Connections Tab */
          <div className="p-6 bg-[#050818] h-[65vh] min-h-[460px] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                Your Connections ({connections.length})
              </span>
              <Link
                to="/connections"
                className="text-[11px] text-pink-400 hover:text-pink-300 font-mono">
                View all
              </Link>
            </div>

            {connections.length === 0 && (
              <div className="text-center text-slate-500 text-sm font-mono py-10">
                No connections yet.{" "}
                <Link to="/feed" className="text-pink-400 hover:text-pink-300">
                  Find developers
                </Link>
              </div>
            )}

            {connections.map((connection) => {
              const {
                _id,
                firstName,
                lastName,
                photoUrl,
                about,
                skills = [],
              } = connection;
              const sharedCount = skills.filter((skill) =>
                user?.skills?.includes(skill),
              ).length;
              const isCurrentChat = _id === targetUserId;
              const isOnline = onlineUsers.includes(_id);

              return (
                <div
                  key={_id}
                  className={`p-4 sm:p-5 rounded-2xl bg-[#0b1029] border flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${
                    isCurrentChat
                      ? "border-pink-500/50"
                      : "border-white/10 hover:border-white/20"
                  }`}>
                  {/* Takes only the space left after the button, so it can never push it out */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={photoUrl || DEFAULT_AVATAR}
                        alt={`${firstName} ${lastName || ""}`}
                        className="w-13 h-13 rounded-2xl object-cover ring-1 ring-white/20"
                      />
                      <span
                        title={isOnline ? "Online" : "Offline"}
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-[#0b1029] ${
                          isOnline ? "bg-emerald-400" : "bg-slate-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {firstName} {lastName}
                        </h4>
                        {isCurrentChat ? (
                          <span className="px-2 py-0.5 rounded bg-pink-500/15 text-pink-300 text-[10px] font-mono font-bold shrink-0">
                            Chatting now
                          </span>
                        ) : (
                          sharedCount > 0 && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold shrink-0">
                              {sharedCount} Shared Skill
                              {sharedCount > 1 ? "s" : ""}
                            </span>
                          )
                        )}
                      </div>
                      {about && (
                        <p className="text-xs text-slate-400 mt-1 truncate">
                          {about}
                        </p>
                      )}
                      {skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {skills.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-cyan-300 border border-white/5">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    {isCurrentChat ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab("chat")}
                        className={CHAT_BUTTON_CLASS}>
                        <MessageSquare className="w-3.5 h-3.5" />
                        Back to Chat
                      </button>
                    ) : (
                      <Link to={`/chat/${_id}`} className={CHAT_BUTTON_CLASS}>
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Chat = () => {
  const { _id: targetUserId } = useParams();
  // Remount per conversation so no state leaks between chats
  return <ChatRoom key={targetUserId} targetUserId={targetUserId} />;
};

export default Chat;
