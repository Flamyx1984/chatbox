import React, { useState } from "react";
const Context = React.createContext();

function ContextProvider(props) {
  const [membersArray, setMembersArray] = useState([])
  const [drone, setDrone] = useState(null)
  const [user, setUser] = useState({ username: "", avatar: "" })
  const [messages, setMessages] = useState([])
  
  
  function userLogout() {
    setMembersArray([])
    setMessages([])
    drone.close()
    setDrone(null)
    setUser({ username: "", avatar: "" })
    
  }

  return (
    <Context.Provider
      value={{
        membersArray,
        setMembersArray,
        userLogout,
        drone,
        setDrone,
        messages,
        setMessages,
        user,
        setUser,
       
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
