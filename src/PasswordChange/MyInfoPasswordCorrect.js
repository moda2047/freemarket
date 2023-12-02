import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyInfoPasswordCorrect.css";
import { useCookies } from "react-cookie";

const MyInfoPasswordCorrect = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies] = useCookies(["token", "author", "userid"]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;

  const handleCheckPassword = async () => {
    try {
      // 사용자가 입력한 비밀번호와 토큰을 사용하여 API 요청을 보냅니다.
      const apiUrl = process.env.REACT_APP_API_URL + "/auth/checkPassword"; // API 엔드포인트 URL
      const data = { password: password }; // 비밀번호를 요청 본문에 포함

      const response = await axios.post(apiUrl, data, {
        headers: { Authorization: token },
      });

      // API 요청이 성공한 경우, 응답을 처리하고 다음 단계를 수행합니다.
      console.log("비밀번호 확인 완료:", response.data);

      // 여기에서 다음 단계로 네비게이션하거나 필요한 작업을 수행할 수 있습니다.
      if (response.data.result === true) {
        // 일치하는 경우 MyInfoUpdateMain 페이지로 이동
        navigate("/MyInfoUpdateMain");
      } else {
        // 일치하지 않는 경우 MyInfoMain 페이지로 이동
        alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
        navigate("/MyInfoMain");
      }
    } catch (error) {
      // API 요청이 실패하면 에러를 처리합니다.
      console.error("비밀번호 확인 실패:", error);
      // 에러 메시지를 설정하여 사용자에게 표시할 수 있습니다.
      setError("비밀번호 확인에 실패했습니다.");
    }
  };

  return (
    <div className="MyInfoPasswordCorrectWrap">
      <div className="MyInfoPasswordCorrectWrapper">
        <div className="MyInfoPasswordCorrectContainer">
          <div className="signInContainer">
            <form className="MyInfoPasswordCorrectForm">
              <div className="MyInfoPasswordCorrectLogoImgDiv">
                <img
                  src="./image/kumohMarket.png"
                  alt="nono"
                  className="mainLogoImg"
                ></img>
              </div>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력해주세요."
                value={password}
                onChange={handlePasswordChange}
              ></input>
              <button
                className="form_MyInfoPasswordCorrectBtn"
                type="button"
                onClick={handleCheckPassword}
              >
                확인
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPasswordCorrect;
