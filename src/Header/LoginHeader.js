import "./LoginHeader.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function LoginHeader() {
  const [query, setQuery] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const inputText = (e) => {
    setQuery(e.target.value);
  };
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("author");
    removeCookie("userid");
  };
  return (
    <div class="loginHeader">
      <div class="loginHeader-top">
        <div class="loginHeader-top-container">
          <div class="loginHeader-top-button">
            <Link to="/">
              <button
                class="loginHeader-top-button-logout"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div class="loginHeader-middle">
        <div class="loginHeader-middle-container">
          <div class="loginHeader-middle-left">
            <div class="loginHeader-middle-left-logo">
              <Link to="/">
                <img src="./image/mainlogo-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
          <div class="loginHeader-middle-center">
            <div class="loginHeader-searchbox">
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
          <div class="loginHeader-middle-right">
            <div class="loginHeader-wishlist">
              <Link to="/WishList">
                <img src="./image/wishlist-icon.png" alt="img"></img>
              </Link>
            </div>
            <div class="loginHeader-mypage">
              <Link to="/MyInfoMain">
                <img src="./image/mypage-icon.png" alt="img"></img>
              </Link>
            </div>
            <div class="loginHeader-chatting">
              <Link to="/ChatMain">
                <img src="./image/chat-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginHeader;
