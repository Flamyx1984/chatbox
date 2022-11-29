import React, { useContext } from "react";
import { Context } from "./Context";

export default function MembersList() {
  const { membersArray } = useContext(Context);

  const memberList = membersArray.map((member) => (
    <div key={member.id}>
      <span>{member.clientData.avatar}</span>
      <span>{member.clientData.username}</span>
    </div>
  ));

  return <div className="member-list">{memberList}</div>;
}
