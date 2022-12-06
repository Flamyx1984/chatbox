import React, { useEffect, useContext } from "react";
import "./ChatBot.css";
import { Context } from "./components/Context";
import Registration from "./components/Registration";
import Messages from "./components/Messages";
import Input from "./components/Input";
import MembersList from "./components/MemberList";
import sound from "./sound.mp3";

export default function App() {
  const { setMembersArray, setDrone, user, setMessages, messages } =
    useContext(Context);

  useEffect(() => play, [messages]);

  useEffect(() => {
    if (user.username) {
      const drone = new window.Scaledrone("az34puPiBAYQ13LD", {
        data: user,
      });
      setDrone(drone);
      setRoom(drone);
    }
  }, [user, setDrone]);

  function setRoom(drone) {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      user.id = drone.clientId;

      const room = drone.subscribe("observable-room");

      room.on("message", (message) => {
        setMessages((prevMsg) => {
          return [...prevMsg, message];
        });
      });
      room.on("members", function (members) {
        setMembersArray([...members]);
      });
      room.on("member_join", function (member) {
        setMembersArray((prevArray) => {
          return [...prevArray, member];
        });
        newMember(member);
      });
      room.on("member_leave", function (member) {
        setMembersArray((current) => {
          return current.filter((oneMember) => oneMember.id !== member.id);
        });
        leftMember(member);
      });
    });
  }

  function play() {
    new Audio(sound).play();
  }
  function newMember(member) {
    let novak = `New member is: ${member.clientData.username}${member.clientData.avatar} `;
    document.getElementById("novi").innerHTML = novak;
    setTimeout(() => {
      let novak = "";
      document.getElementById("novi").innerHTML = novak;
    }, 5000);
  }
  function leftMember(member) {
    let otisao = `Has left the chat: ${member.clientData.username}${member.clientData.avatar} `;
    document.getElementById("novi").innerHTML = otisao;
    setTimeout(() => {
      let otisao = "";
      document.getElementById("novi").innerHTML = otisao;
    }, 5000);
  }
  return !user.username  ? (
    <Registration />
  ) : (
    <div className="all">
      <span id="novi" className="spantxt"></span>
      <div>
        <MembersList className="member-list" />
      </div>
      <div className="msg">
        <Messages />
      </div>

      <div className="input">
        <Input />
      </div>
    </div>
  );
}
