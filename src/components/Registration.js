import React, { useContext } from "react";
import { Context } from "./Context";

function Registration() {
  const { setUser } = useContext(Context);
  let name = "";
  let avet = "";
  
  function submitForm(e) {
    e.preventDefault();
    setUser({ username: name, avatar: avet });
  }

  return (
    <div>
      <h1 className="h1">Welcome to ChatBot</h1>
      <div className="input-reg">
        <form className="input-form" onSubmit={submitForm}>
          <select
            required
            className="input-select"
            onChange={(e) =>(avet = e.target.value)}
          >
            <option value="">Pick your Avatar</option>
            <option value="🧛‍♂️">🧛‍♂️</option>
            <option value="🧙🏻">🧙🏻</option>
            <option value="😈">😈</option>
            <option value="🐮">🐮</option>
            <option value="🎃">🎃</option>
            <option value="🦁">🦁</option>
            <option value="👻">👻</option>
            <option value="☃️">☃️</option>
            <option value="🦔">🦔</option>
            <option value="🦝">🦝</option>
          </select>
          <input
            className="input-input"
            type="text"
            placeholder="Enter name..."
            required
            onChange={(e) => (name = e.target.value)}
          />

          <button className="input-btn" type="submit">
            Enter room
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
