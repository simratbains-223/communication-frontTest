import { useContext, useRef, useState, useEffect, useCallback } from "react";
import { SocketContext, MESSAGE_TYPE } from "../context/socket.context";
import "./home-testOnly-page.css";

function HomePage() {
  const [currentChannel, setCurrentChannel] = useState({
    channel_id: 0,
    channel_name: "",
  });
  const [user, setUser] = useState({ id: 0, user_name: "", avatar: "" });
  const [tempMessage, setTempMessage] = useState({
    channel_id: 0,
    channel_name: "",
    user_id: 0,
    user_name: "",
    avatar: "",
  });
  const {
    socket,
    channelUsers,
    getChannelUsers,
    channelMessages,
    setChannelMessages,
    joinChannel,
    sendMessage,
    leaveChannel,
  } = useContext(SocketContext);

  const messageInput = useRef();
  const channelInput = useRef();
  const messageWindow = useRef();

  useEffect(() => {
    const handleReceiveMessage = (message) =>
      setChannelMessages((prevData) => [...prevData, message]);

    socket.on(MESSAGE_TYPE.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(MESSAGE_TYPE.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [socket, channelMessages]);

  const handleUserName = (event) => {
    if (event.target) {
      //console.dir(event.target);
      //console.log(event.target[event.target.selectedIndex].label);

      const userAvatar =
        event.target[event.target.selectedIndex].label.split(" ")?.[0];

      if (event.target.value === "") return;
      //console.log(event.currentTarget.value);
      setUser((prevData) => {
        return {
          ...prevData,
          id: event.target.selectedIndex,
          user_name: event.target.value,
          avatar: userAvatar,
        };
      });
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (currentChannel.channel_name === "") {
      return;
    }
    const sendMsg = {
      ...tempMessage,
      message: messageInput.current.value,
    };

    sendMessage(sendMsg);
    messageInput.current.value = "";
  };

  const handleJoinChannel = () => {
    if (user.user_name === "") return;
    const channelId = parseInt(channelInput.current.value);
    const channelName = `Channel ${channelId}`;
    console.log("Join: " + channelName);
    setCurrentChannel((prevValue) => {
      return { ...prevValue, channel_id: channelId, channel_name: channelName };
    });

    const sendMessage = {
      ...tempMessage,
      channel_id: channelId,
      channel_name: channelName,
      user_id: user.id,
      avatar: user.avatar,
      user_name: user.user_name,
    };

    setTempMessage(sendMessage);

    joinChannel(sendMessage);
  };

  const handleLeaveChannel = () => {
    leaveChannel();
    console.log("Leave channel");
  };

  const handleGetChannelUsers = () => {
    getChannelUsers();
  };

  return (
    <div className='MessageTest'>
      <div>
        <select onChange={handleUserName}>
          <option value=''>-name-</option>
          <option value='Aaron'>👻 Aaron</option>
          <option value='Allen'>😺 Allen</option>
          <option value='Andrew'>🤖 Andrew</option>
        </select>
      </div>
      <form id='msg-form' onSubmit={handleSendMessage}>
        <input ref={messageInput} id='msg-input' autoComplete='off' />
        <button type='submit'>Send</button>
      </form>
      <input ref={channelInput} id='channel_id' type='number'></input>
      {/* <input type='text' placeholder='User name' ref={userNameInput} /> */}
      <button type='button' onClick={handleJoinChannel}>
        Join
      </button>
      <button type='button' onClick={handleLeaveChannel}>
        Leave
      </button>
      <button type='button' onClick={handleGetChannelUsers}>
        channel users
      </button>
      <div>
        {channelUsers
          ? channelUsers.users[currentChannel.channel_name].map((user, idx) => (
              <p key={idx}>{user.user_name}</p>
            ))
          : null}
      </div>
      <div className='message-window' ref={messageWindow}>
        <ul>
          {channelMessages
            ? channelMessages.map((msg, idx) => (
                <li
                  key={idx}
                >{`${msg.avatar} ${msg.user_name}: ${msg.message}`}</li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
