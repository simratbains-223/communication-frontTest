import React from "react";
import Channel from "../components/Channel";
import Message from "../components/Message";
import InputMessage from "../components/InputMessage";
import "./chat-page.css";

export default function ChatPage() {
  return (
    <div className='chat-page-container'>
      <div className='channel-container'>
        <Channel />
      </div>
      <div className='message-container'>
        <Message />
        <InputMessage />
      </div>
    </div>
  );
}
