import React from "react";
import "./inputMessage.css";

export default function InputMessage() {
  return (
    <div className='input-message-container'>
      <form className='input-message-form'>
        <input
          type='text'
          placeholder='Write message'
          className='message-input'
        />
        <button className='sendBtn'>SEND</button>
      </form>
    </div>
  );
}
