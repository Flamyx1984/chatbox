import React, { useContext } from "react";
import { Context } from "./Context";

export default function Messages(props) {
  const { messages } = useContext(Context);
  
  const messageElements= messages.map((msg) => renderMessage(msg))
  
  function renderMessage(msg) {
    const { member, data, timestamp } = msg;

    return (
      <div key={timestamp}>
        <div className="msg-container">
          <div>
            {member.clientData.avatar} {member.clientData.username} :{" "}
            {data.poruka.text}
          </div>
        </div>
      </div>
    );
  }

  return ( 
    <div className="msg-list">{messageElements}</div>
  );
}
