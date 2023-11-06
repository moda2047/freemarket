import React, { useState, useEffect } from "react";
import "./MyInfoUpdate.css";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyInfoUpdate = (props) => {
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false); // 추가: 입력 필드 활성화 상태를 관리

  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/member/search?id=${userid}`)
      .then((response) => {
        const userData = response.data.found[0];
        setUserData(userData);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, [userid]);

  const handleEditClick = () => {
    setIsEditing(!isEditing); // 수정 버튼 클릭 시 입력 필드 활성화/비활성화 전환
  };

  const handleUpdateClick = () => {
    if (!isEditing) {
      // 수정 중이 아니라면, 수정 모드로 전환
      setIsEditing(true);
    } else {
      // 수정 중이라면, 서버에 업데이트 요청 보냄
      axios
        .patch(
          "http://localhost:8000/member/change",
          {
            id: userData.id,
            password: userData.password,
            email: userData.email,
            name: userData.name,
            mobile: userData.mobile,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("정보가 성공적으로 업데이트되었습니다.");
          setIsEditing(false); // 수정 완료 후 수정 모드 종료
        })
        .catch((error) => {
          console.error("정보 업데이트에 실패했습니다.", error);
        });
    }
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="MyInfoUpdateWrap">
      <div className="MyInfoUpdateWrapDiv">
        <h3>
          <img src="./image/MyInfoUpdate.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="MyInfoUpdateMainWrap">
        <div className="MyInfoUpdateMainIntro">
          <div className="MyInfoUpdateMainIntroImgDiv"></div>
          <span className="MyInfoUpdateMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {userid}
          </span>
          님의 정보입니다.
        </div>
        <div className="MyInfoUpdateMainContentsWrap">
          <table>
            <tr>
              <td>아이디</td>
              <td>
                <input
                  placeholder={userData.id}
                  value={userData.id}
                  onChange={(e) => handleFieldChange("id", e)}
                  disabled={!isEditing}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호 변경</td>
              <td>
                <input
                  type="password"
                  placeholder={userData.password}
                  value={userData.password}
                  onChange={(e) => handleFieldChange("password", e)}
                  disabled={!isEditing}
                />
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input
                  placeholder={userData.email}
                  value={userData.email}
                  onChange={(e) => handleFieldChange("email", e)}
                  disabled={!isEditing}
                />
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input
                  placeholder={userData.name}
                  value={userData.name}
                  onChange={(e) => handleFieldChange("name", e)}
                  disabled={!isEditing}
                />
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input
                  placeholder={userData.mobile}
                  value={userData.mobile}
                  onChange={(e) => handleFieldChange("mobile", e)}
                  disabled={!isEditing}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="MyInfoUpdateBtnWrap">
        <div className="MyInfoUpdateBtnGoUpdate">
          <button onClick={isEditing ? handleUpdateClick : handleEditClick}>
            {isEditing ? "변경" : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoUpdate;
