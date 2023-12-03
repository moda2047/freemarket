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
  const [resToken, setResToken] = useState(0);
  const [tokenMatch, setTokenMatch] = useState(false);
  const handleTokenVerification = () => {
    if (token.value === resToken.value) {
      // 입력한 값과 요청시 수신한 값 비교
      window.alert("인증번호가 일치합니다.");
      setTokenMatch(true);
    } else {
      window.alert("인증번호가 일치하지 않습니다.");
      setTokenMatch(false);
    }
  };

  const handleEmailAuth = () => {
    // 이메일과 아이디를 입력하지 않았을 경우 예외처리
    if (!email || !id) {
      alert("이메일과 아이디를 입력하세요.");
      return;
    }

    // 서버로 이메일 인증 요청 보내기
    fetch(
      `${process.env.REACT_APP_API_URL}/auth/mailAuthChangePw?id=${id}&emailId=${email}`
    )
      .then((response) => {
        if (response.status === 200) {
          // 서버 응답이 성공인 경우
          window.alert("이메일 인증 코드가 발송되었습니다.");
          console.log("이메일 인증 코드를 성공적으로 받아왔습니다.");
          // 서버에서 받은 인증 코드를 저장
          setResToken(response.data.authNum);
          return response.json();
        } else {
          console.error("서버 응답이 실패했습니다.");
          throw new Error("이메일 인증 코드를 받아오는 데 실패했습니다.");
        }
      })
      .then((data) => {
        // 서버에서 받은 데이터를 처리
        // 여기서 data에는 서버에서 받은 JSON 데이터가 포함됩니다.
        console.log("서버에서 받은 데이터:", data);
      })
      .catch((error) => {
        console.error("이메일 인증 코드 요청 중 오류 발생:", error);
      });
  };

  const handleFormSubmit = () => {
    // 폼 제출 시 호출되는 함수
    if (password !== confirmPassword) {
      // 비밀번호 확인 실패
      console.log("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!tokenMatch) {
      console.log("인증번호 확인을 완료해주세요.");
      return;
    }
    // 데이터를 서버로 전송
    fetch(process.env.REACT_APP_API_URL + "/member/changePw", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: id,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // 서버 응답이 성공인 경우
          window.alert("비밀번호 변경이 완료되었습니다.");
          console.log("비밀번호 변경이 완료되었습니다.");
        } else {
          console.error("서버 응답이 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("요청 중 오류 발생:", error);
      });
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
                      <input
                        style={{ float: "left", width: "90px" }}
                        value="@kumoh.ac.kr"
                        disabled
                      />
                      <button
                        className="emailAuthBtn"
                        onClick={handleEmailAuth}
                      >
                        이메일 인증
                      </button>
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
