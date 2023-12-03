import "./LogoutHeader.css";
import React, { useState } from "react";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDetailSearch from "./HeaderDetailSearch";

function LogoutHeader(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const form = {
      keyword: query,
    };

    navigate("/ProductListSearch?Keyword=" + `${query}`, { state: form });
  };

  /* 로그인 안했을 시 로그인으로 넘어가도록 해야함 */
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
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
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleOnKeyPress}
              />
              <button type="submit" onClick={handleSearch}>
                <img src="./image/search-icon.png" alt="img"></img>
              </button>
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
            <div className="logoutHeader-productCreate">
              <Link to="/Login">
                <img src="./image/productCreate-icon.png" alt="img"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="logoutHeader-bottom">
        <HeaderDetailSearch />
      </div>
    </div>
  );
}

export default LogoutHeader;
