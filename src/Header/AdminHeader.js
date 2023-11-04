import "./AdminHeader.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
function AdminHeader() {
  const [query, setQuery] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token", "author"]);

  const inputText = (e) => {
    setQuery(e.target.value);
  };
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("author");
    removeCookie("userid");
  };

  return (
    <div class="adminHeader">
      <div class="adminHeader-top">
        <div class="adminHeader-top-container">
          <div class="adminHeader-top-button">
            <Link to="/">
              <button
                class="adminHeader-top-button-logout"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div class="adminHeader-middle">
        <div class="adminHeader-middle-container">
          <div class="adminHeader-middle-left">
            <div class="adminHeader-middle-left-logo">
              <Link to="/">
                <img src="./image/mainlogo-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
          <div class="adminHeader-middle-center">
            <div class="adminHeader-searchbox">
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
          <div class="adminHeader-middle-right">
            <div class="adminHeader-adminpage">
              <Link to="/AdminMain">
                <img src="./image/adminpage-icon.png" alt="img"></img>
              </Link>
            </div>
            <div class="adminHeader-chatting">
              <Link to="/">
                <img src="./image/chat-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
