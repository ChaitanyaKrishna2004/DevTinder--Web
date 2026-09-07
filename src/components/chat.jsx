import React, { useEffect, useState } from "react";
import { Send, CheckCheck } from "lucide-react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      isSelf: true,
      text: inputVal,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
  };

  const user = useSelector((store) => store.user);
  const targetUser = useParams();

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      userId: user?._id,
      targetUserId: targetUser?._id,
    });

    return () => {
      socket.disconnect();
    };
  });

  return (
    <div className="flex flex-col bg-[#050818] min-h-[600px] h-[80vh] w-full max-w-4xl mx-auto rounded-3xl border border-white/20 shadow-lg overflow-hidden mt-10">
      {/* Message Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 text-sm mt-10 font-mono">
            No messages yet. Start the conversation!
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isSelf ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm ${
                msg.isSelf
                  ? "bg-gradient-to-br from-pink-600/90 to-purple-600/90 text-white rounded-tr-none shadow-lg shadow-pink-600/20"
                  : "bg-[#0f1738] border border-white/10 text-slate-200 rounded-tl-none"
              }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] opacity-75 font-mono">
                <span>{msg.time}</span>
                {msg.isSelf && (
                  <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Interactive Message Bar */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-[#070b1e] border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-[#030612] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
          title="Send message">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
