import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";
import { useCookies } from "react-cookie";
const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setTokenCookie] = useCookies(["token"]);
  const [, setAuthorCookie] = useCookies(["author"]);
  const [, setUserIdCookie] = useCookies(["userid"]);
  // 로그인 토큰
  const [token, setToken] = useState("");

  // 로그인시 사용자 권한 / 0 = 일반, 1 = 관리자
  const [author, setAuthor] = useState(0);

  const navigate = useNavigate();

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginAPI = process.env.REACT_APP_API_URL + "/auth/login";

    axios
      .post(
        loginAPI,
        {
          id: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const result = response.data.result;
        const message = response.data.message;
        const token = response.data.token;
        const author = response.data.author;

        if (result) {
          // 로그인 성공

          // 로그인 토큰과 로그인한 사용자에 대한 권한 저장
          const oneHourFromNow = new Date();
          oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000);

          setTokenCookie("token", token, {
            expires: oneHourFromNow,
            path: "/",
          });
          setAuthorCookie("author", author, {
            expires: oneHourFromNow,
            path: "/",
          });
          setTokenCookie("userid", id, {
            expires: oneHourFromNow,
            path: "/",
          });
          console.log(message);
          window.alert(message);

          // 로그인 이후 메인페이지로 이동? 마이페이지로 이동?
          navigate("/");
        } else {
          // 로그인 실패
          console.log(message);
          window.alert(message);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("로그인에 실패하였습니다.");
      });
  };

  return (
    <div className="loginWrap">
      <div className="loginWrapper">
        <div className="loginContainer">
          <div className="signInContainer">
            <form className="loginForm" onSubmit={handleSubmit}>
              <div className="loginLogoImgDiv">
                <img
                  src="./image/kumohMarket.png"
                  alt="nono"
                  className="mainLogoImg"
                ></img>
              </div>
              <input
                type="id"
                placeholder="아이디"
                value={id}
                onChange={handleIdChange}
              ></input>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              ></input>
              <button
                className="form_loginBtn"
                type="submit"
                onClick={handleSubmit}
              >
                로그인
              </button>
              <div className="loginSignUpCon">
                <span>
                  회원이
                  아닌가요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <Link to="/Memberjoin">
                  <span className="goSignUpPageSpan">회원가입</span>
                </Link>
              </div>
              <div className="loginPasswordSearch">
                <Link to="/PasswordChange">
                  <button className="loginPasswordSearchBtn">
                    <span className="loginPasswordSearchSpan">
                      비밀번호 변경
                    </span>
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
