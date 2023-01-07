import { useContext, useRef, useState } from "react";
import { SocketContext } from "../context/socket.context";
import "./home-testOnly-page.css";

function HomePage() {
  const [currentChannel, setCurrentChannel] = useState({
    channel_id: 0,
    channel_name: "",
  });

  const [currentUser, setCurrentUser] = useState({
    id: 0,
    user_name: "",
    avatar: "",
  });

  const [tempMessage, setTempMessage] = useState({
    channel_id: 0,
    channel_name: "",
    user_id: 0,
    user_name: "",
    avatar: "",
  });

  const {
    channelUsers,
    channelMessages,
    joinChannel,
    sendMessage,
    deleteMessage,
    leaveChannel,
  } = useContext(SocketContext);

  // These are only for testing purposes
  const messageInput = useRef();
  const channelInput = useRef();
  const messageWindow = useRef();

  // Temporarily setting user info - later: using user info after login
  const handleUserName = (event) => {
    if (event.target) {
      const userAvatar =
        event.target[event.target.selectedIndex].label.split(" ")?.[0];

      if (event.target.value === "") return;

      setCurrentUser((prevData) => {
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
    // fill up message
    const sendMsg = {
      ...tempMessage,
      message: messageInput.current.value,
    };

    //Context Library- sendMessage
    sendMessage(sendMsg);
    messageInput.current.value = "";
  };

  const handleJoinChannel = () => {
    if (currentUser.user_name === "") return;
    //Get channelId and channelName
    const channelId = parseInt(channelInput.current.value);
    const channelName = `Channel ${channelId}`;

    //Check if the channel is already joined
    if (currentChannel && currentChannel.channel_id === channelId) {
      console.log("Already joined: " + channelName);
      return;
    }

    //Fill up channelID, channelName, userID, userName
    const sendMessage = {
      ...tempMessage,
      channel_id: channelId,
      channel_name: channelName,
      user_id: currentUser.id,
      user_name: currentUser.user_name,
      avatar: currentUser.avatar,
    };
    //Save basic message info to useState
    setTempMessage(sendMessage);

    console.log("Join: " + channelName);

    //Context Library- joinChannel
    joinChannel(sendMessage);

    //Save current channel to useState
    setCurrentChannel((prevValue) => {
      return { ...prevValue, channel_id: channelId, channel_name: channelName };
    });
  };

  const handleLeaveChannel = () => {
    //Context Library- leaveChannel
    leaveChannel(tempMessage);
    setCurrentChannel(null);
    console.log("Leave channel", tempMessage);
  };

  const handleDeleteMessage = (msgId) => {
    //Context Library- deleteMessage
    deleteMessage(currentChannel.channel_id, msgId);
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
      <input ref={channelInput} id='channel_id' type='number' min='0'></input>
      <button type='button' onClick={handleJoinChannel}>
        Join
      </button>
      <button type='button' onClick={handleLeaveChannel}>
        Leave
      </button>
      {/* <button type='button' onClick={handleGetChannelUsers}>
        channel users
      </button> */}
      <div>
        {channelUsers
          ? channelUsers.users[currentChannel?.channel_name]?.map(
              (currentUser, idx) => <p key={idx}>{currentUser.user_name}</p>
            )
          : null}
      </div>
      <div className='message-window' ref={messageWindow}>
        <ul>
          {channelMessages
            ? channelMessages.map((msg, idx) => (
                <li key={idx}>
                  {`${msg.avatar} ${msg.user_name}: ${msg.message}`}{" "}
                  {msg.user_id === currentUser.id ? (
                    <button onClick={() => handleDeleteMessage(msg.id)}>
                      Del
                    </button>
                  ) : null}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
