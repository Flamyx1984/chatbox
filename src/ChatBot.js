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
        const { data, member, timestamp, id } = message;

        setMessages((prevMsg) => {
          return [...prevMsg, { data, member, timestamp, id }];
        });
      });
      room.on("members", function (members) {
        setMembersArray([...members]);
      });
      room.on("member_join", function (member) {
        setMembersArray((prevArray) => {
          return [...prevArray, member];
        });
      });
      room.on("member_leave", function (member) {
        setMembersArray((current) => {
          return current.filter((oneMember) => oneMember.id !== member.id);
        });
      });
    });
  }

  function play() {
    new Audio(sound).play();
  }

  return user.username === "" ? (
    <Registration />
  ) : (
    <div className="all">
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
