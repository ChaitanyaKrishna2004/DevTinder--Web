import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants.js";
import { setOnlineUsers } from "./presenceSlice.js";

let socket = null;

// withCredentials sends the login cookie the server uses to authenticate
const createSocketConnection = () => {
  if (BASE_URL.startsWith("http")) {
    return io(BASE_URL, { withCredentials: true });
  }
  // In production the API lives under /api, so socket.io needs that path
  return io("/", { path: `${BASE_URL}/socket.io`, withCredentials: true });
};

// One shared connection per browser tab while the user is logged in
export const getSocket = () => {
  if (!socket) socket = createSocketConnection();
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

// Ask the server which of my connections are online right now
export const syncOnlineConnections = (dispatch) => {
  getSocket().emit("getOnlineConnections", {}, (res) => {
    if (res?.ok) dispatch(setOnlineUsers(res.userIds));
  });
};
