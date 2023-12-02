import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Memberjoin.css";

import axios from "axios";

const Memberjoin = (props) => {
  const [id, setId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  // 입력 인증번호
  const [token, setToken] = useState(null);
  // 비교용 수신한 인증번호
  const [resToken, setResToken] = useState(0);

  const [idError, setIdError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const navigate = useNavigate();

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

  // 이메일 인증 버튼
  const handleMailAuthentication = (event) => {
    event.preventDefault();

    const mailAuthAPI = process.env.REACT_APP_API_URL + "/auth/mailAuth";

    axios
      .get(
        mailAuthAPI,
        {
          params: {
            emailId: emailId,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          setResToken(response.data.authNum);
          window.alert("인증코드가 해당 이메일로 발송되었습니다.");
          console.log(response.data.message);
          console.log(response);
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
      });
  };

  // 인증 코드 확인
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

  // 가입하기 버튼
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const memberJoinAPI = process.env.REACT_APP_API_URL + "/member/enroll";

    // 폼 제출 시 호출되는 함수
    if (password !== confirmPassword) {
      // 비밀번호 확인 실패
      console.log("비밀번호가 일치하지 않습니다.");
      return;
    }
    const idPattern = /^[a-zA-Z0-9]{5,15}$/;
    if (!idPattern.test(id)) {
      // 아이디 유효성 검사 실패
      console.log(
        "아이디는 5글자 이상 15글자 이하의 영문 대소문자와 숫자로만 입력해주세요."
      );
      setIdError(true);
      return;
    }

    if (name.length < 2 || name.length >= 6) {
      // 이름 유효성 검사 실패
      console.log("이름은 2글자 이상 10글자 이하로 입력해주세요.");
      setNameError(true);
      return;
    }

    const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      // 핸드폰 번호 유효성 검사 실패
      console.log("올바른 핸드폰 번호를 ###-####-#### 형식으로 입력해주세요.");
      setPhoneNumberError(true);
      return;
    }

    if (!tokenMatch) {
      console.log("인증번호 확인을 완료해주세요.");
      return;
    }

    setEmail(emailId + "@kumoh.ac.kr");

    axios
      .post(
        memberJoinAPI,
        {
          id: id,
          password: password,
          email: email,
          name: name,
          mobile: phoneNumber.replace(/-/g, ""),
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // 'Accept': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data.result) {
          console.log(response.data.message);
          window.alert(
            "회원가입이 완료되었습니다. \n가입한 아이디로 로그인 해주세요."
          );
          // 로그인 페이지로 이동
          navigate("/login");
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("오류 발생 : ", error);
        window.alert("회원가입이 정상적으로 되지 않았습니다.");
      });
  };

  return (
    <div className="MemberjoinWrap">
      <div className="MemberjoinWrapper">
        <div className="MemberjoinContainer">
          <div className="MemberjoinInContainer">
            <div className="MemberjoinLogoImgDiv">
              <img
                src="./image/kumohMarket.png"
                alt="nono"
                className="mainLogoImg"
              />
            </div>
            <div className="MemberjoinContentsDiv">
              <table className="memberJoinContentsTable">
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
                          setIdError(false);
                        }}
                      />
                    </td>
                    <td>
                      {idError && (
                        <span style={{ color: "red" }}>
                          아이디는 5글자 이상 15글자 이하의
                          <br />
                          영문 대소문자와 숫자로만 입력해주세요.
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>이메일 아이디</span>
                    </td>
                    <td>
                      <input
                        style={{ width: "" }}
                        type="text"
                        placeholder="이메일 아이디"
                        value={emailId}
                        onChange={(e) => {
                          setEmailId(e.target.value);
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
                        onClick={handleMailAuthentication}
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
                        value={token !== null ? token : ""}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        style={{ float: "left" }}
                        className="emailTokenBtn"
                        onClick={handleTokenVerification}
                      >
                        인증 확인
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>비밀번호</span>
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
                  <tr>
                    <td>
                      <span>이름</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameError(false);
                        }}
                      />
                    </td>
                    <td>
                      {nameError && (
                        <span style={{ color: "red" }}>
                          이름은 2글자 이상
                          <br /> 10글자 이하로 입력해주세요.
                        </span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>전화번호</span>
                    </td>
                    <td>
                      <input
                        type="tel"
                        placeholder="예: 123-4561-7890"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          setPhoneNumberError(false);
                        }}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                      />
                    </td>
                    <td>
                      {phoneNumberError && (
                        <span style={{ color: "red" }}>
                          핸드폰 번호를 ###-####-####로
                          <br /> 입력해주세요.
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="MemberjoinBtnDiv">
              <button className="memberJoinBtn" onClick={handleFormSubmit}>
                가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memberjoin;
