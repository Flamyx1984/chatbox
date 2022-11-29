import React, { useState, useContext } from "react";
import { Context } from "./Context";

export default function Input(props) {
  const { userLogout, drone, user } = useContext(Context);
  const [poruka, setPoruka] = useState({ text: "" });

  function onSendMessage(e) {
    e.preventDefault();
    drone.publish({
      room: "observable-room",
      message: {poruka},
    });
    setPoruka({ text: "" });
  }

  return (
    <div className="chat">
      <div>
        <div className="user-name">User: {user.username}</div>
      </div>
      <form className="chat-form" onSubmit={onSendMessage}>
        <input
          className="chat-form__input"
          onChange={(e) => setPoruka({ text: e.target.value })}
          value={poruka.text}
          type="text"
          placeholder="Enter your message..."
          autoFocus={true}
        />

        <button className="chat-btn">Send Message </button>
        <button className="logout-btn" onClick={userLogout}>
          LogOut
        </button>
      </form>
    </div>
  );
}
