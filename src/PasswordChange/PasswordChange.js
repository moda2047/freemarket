import React, { useState } from "react";
import "./PasswordChange.css";

const PasswordChange = (props) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [token, setToken] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(password === newConfirmPassword);
  };

  const handleFormSubmit = () => {
    // 폼 제출 시 호출되는 함수
    if (password !== confirmPassword) {
      // 비밀번호 확인 실패
      console.log("비밀번호가 일치하지 않습니다.");
      return;
    }
    //서버에 아이디 확인 코드 작성 부분
    //폼 제출시 아이디인증, 이메일인증, 토큰 인증까지 완료됐으면 전송하는 코드 추가부분
  };

  const handleTokenVerification = () => {
    //메일 토큰 인증 코드 작성부분
  };

  return (
    <div className="PasswordChangeWrap">
      <div className="PasswordChangeWrapper">
        <div className="PasswordChangeContainer">
          <div className="PasswordChangeInContainer">
            <div className="PasswordChangeLogoImgDiv">
              <img
                src="./image/kumohMarket.png"
                alt="nono"
                className="mainLogoImg"
              />
            </div>
            <div className="PasswordChangeContentsDiv">
              <table className="PasswordChangeContentsTable">
                <tbody>
                  <tr>
                    <td>
                      <span>아이디</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>이메일</span>
                    </td>
                    <td>
                      <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <button className="emailAuthBtn">이메일 인증</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>인증 코드</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="인증 코드"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className="emailTokenBtn"
                        onClick={handleTokenVerification}
                      >
                        인증 확인
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>새 비밀번호</span>
                    </td>
                    <td>
                      <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>비밀번호 확인</span>
                    </td>
                    <td>
                      <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </td>
                    <td>
                      {passwordMatch ? (
                        <span style={{ color: "green" }}>
                          비밀번호가 일치합니다.
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>
                          비밀번호가 일치하지 않습니다.
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="PasswordChangeBtnDiv">
              <button className="PasswordChangeBtn" onClick={handleFormSubmit}>
                변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordChange;
