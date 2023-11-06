import "./LogoutHeader.css";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Login from "../Login/Login";

function LogoutHeader(props) {
  const [query, setQuery] = useState("");

  const inputText = (e) => {
    setQuery(e.target.value);
  };

  /* 로그인 안했을 시 로그인으로 넘어가도록 해야함 */

  return (
    <div className="logoutHeader">
      <div className="logoutHeader-top">
        <div className="logoutHeader-top-container">
          <div className="logoutHeader-top-button">
            <Link to="/Login">
              <button className="logoutHeader-top-button-login">로그인</button>
            </Link>
            <Link to="/Memberjoin">
              <button className="logoutHeader-top-button-memberJoin">
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="logoutHeader-middle">
        <div className="logoutHeader-middle-container">
          <div className="logoutHeader-middle-left">
            <div className="logoutHeader-middle-left-logo">
              <Link to="/">
                <img src="./image/mainlogo-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
          <div className="logoutHeader-middle-center">
            <div className="logoutHeader-searchbox">
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
          <div className="logoutHeader-middle-right">
            <div className="logoutHeader-wishlist">
              <Link to="/Login">
                <img src="./image/wishlist-icon.png" alt="img"></img>
              </Link>
            </div>
            <div className="logoutHeader-mypage">
              <Link to="/Login">
                <img src="./image/mypage-icon.png" alt="img"></img>
              </Link>
            </div>
            <div className="logoutHeader-chatting">
              <Link to="/Login">
                <img src="./image/chat-icon.png" alt="img"></img>
              </Link>
            </div>
            <div classNameName="logoutHeader-productCreate">
              <Link to="/Login">
                <img src="./image/productCreate-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutHeader;
