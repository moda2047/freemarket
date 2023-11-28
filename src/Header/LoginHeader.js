import "./LoginHeader.css";
import HeaderDetailSearch from "./HeaderDetailSearch";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function LoginHeader() {
  const navigate = useNavigate();
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

  const handleSearch = (e) => {
    const form = {
      keyword: query,
    };

    navigate("/ProductListSearch?Keyword=" + `${query}`, { state: form });
  };

  return (
    <div className="loginHeader">
      <div className="loginHeader-top">
        <div className="loginHeader-top-container">
          <div className="loginHeader-top-button">
            <Link to="/">
              <button
                className="loginHeader-top-button-logout"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="loginHeader-middle">
        <div className="loginHeader-middle-container">
          <div className="loginHeader-middle-left">
            <div className="loginHeader-middle-left-logo">
              <Link to="/">
                <img src="./image/mainlogo-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
          <div className="loginHeader-middle-center">
            <div className="loginHeader-searchbox">
              <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" onClick={handleSearch}>
                <img src="./image/search-icon.png" alt="img"></img>
              </button>
            </div>
          </div>
          <div className="loginHeader-middle-right">
            <div className="loginHeader-wishlist">
              <Link to="/WishList">
                <img src="./image/wishlist-icon.png" alt="img"></img>
              </Link>
            </div>
            <div className="loginHeader-mypage">
              <Link to="/MyInfoMain">
                <img src="./image/mypage-icon.png" alt="img"></img>
              </Link>
            </div>
            <div className="loginHeader-chatting">
              <Link to="/ChatMain">
                <img src="./image/chat-icon.png" alt="img"></img>
              </Link>
            </div>
            <div className="loginHeader-productCreate">
              <Link to="/ProductCreate">
                <img src="./image/productCreate-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="loginHeader-bottom">
        <HeaderDetailSearch />
      </div>
    </div>
  );
}

export default LoginHeader;
