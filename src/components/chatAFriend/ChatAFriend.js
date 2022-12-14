import React from "react";
import { Link } from "react-router-dom";
import "./ChatAFriend.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ChatAFriend({ username }) {
  const { user } = useContext(AuthContext);
  return (
    <Link to="/messenger" className="chatAFriend">
      {/* {(!username || username === user.username) && ( */}
      {username === user.username && (
        <button className="ChatAFriendBtn">Chat A Friend</button>
      )}
      {/* <button className="ChatAFriendBtn">Chat A Friend</button> */}
    </Link>
  );
}
