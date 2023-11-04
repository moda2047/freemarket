import "./LogoutHeader.css";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Login from "../Login/Login";

function LogoutlogoutHeader(props) {
  const [query, setQuery] = useState("");

  const inputText = (e) => {
    setQuery(e.target.value);
  };

  /* 로그인 안했을 시 로그인으로 넘어가도록 해야함 */

  return (
    <div class="logoutHeader">
      <div class="logoutHeader-top">
        <div class="logoutHeader-top-container">
          <div class="logoutHeader-top-button">
            <Link to="/Login">
              <button class="logoutHeader-top-button-login">로그인</button>
            </Link>
            <Link to="/Memberjoin">
              <button class="logoutHeader-top-button-memberJoin">
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div class="logoutHeader-middle">
        <div class="logoutHeader-middle-container">
          <div class="logoutHeader-middle-left">
            <div class="logoutHeader-middle-left-logo">
              <Link to="/">
                <img src="./image/mainlogo-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
          <div class="logoutHeader-middle-center">
            <div class="logoutHeader-searchbox">
              <input
                type="text"
                name="query"
                value={query}
                onChange={inputText}
              />
              <Link to="/">
                <button type="submit">
                  <img src="./image/search-icon.png" alt="img"></img>
                </button>
              </Link>
            </div>
          </div>
          <div class="logoutHeader-middle-right">
            <div class="logoutHeader-wishlist">
              <Link to="/Login">
                <img src="./image/wishlist-icon.png" alt="img"></img>
              </Link>
            </div>
            <div class="logoutHeader-mypage">
              <Link to="/Login">
                <img src="./image/mypage-icon.png" alt="img"></img>
              </Link>
            </div>
            <div class="logoutHeader-chatting">
              <Link to="/Login">
                <img src="./image/chat-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutlogoutHeader;
