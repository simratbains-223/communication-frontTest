import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const MESSAGE_TYPE = {
  GET_CHANNELS: "get_channels",
  CHANNEL_USERS: "channel_users",
  JOIN_CHANNEL: "join_channel",
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
  DELETE_MESSAGE: "delete_message",
  LEAVE_CHANNEL: "leave_channel",
};

const socket = io.connect("http://localhost:4000", {
  withCredentials: true,
});
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
  const [channelUsers, setChannelUsers] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  function getChannelUsers() {
    socket.emit(MESSAGE_TYPE.CHANNEL_USERS);
    socket.on(MESSAGE_TYPE.CHANNEL_USERS, (responseData) => {
      //console.log("Channel users: ", responseData);
      setChannelUsers(responseData);
    });
  }

  function joinChannel(joinMessage) {
    socket.emit(MESSAGE_TYPE.JOIN_CHANNEL, joinMessage);
    socket.on(MESSAGE_TYPE.JOIN_CHANNEL, (messages) => {
      if (messages) {
        console.log(messages);
        setChannelMessages(messages);
      }
    });
  }

  function sendMessage(message) {
    socket.emit(MESSAGE_TYPE.SEND_MESSAGE, message);
    return;
  }

  function leaveChannel() {
    socket.emit(MESSAGE_TYPE.LEAVE_CHANNEL);
    return;
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        channelUsers,
        channelMessages,
        setChannelMessages,
        getChannelUsers,
        joinChannel,
        sendMessage,
        leaveChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
