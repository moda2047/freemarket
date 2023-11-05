import React, { useState, useEffect } from "react";
import "./MyInfoSearch.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyInfoSearch = (props) => {
  const { activeTab, onTabClick } = props;
  const [cookie, setCookie, removeCookie] = useCookies();
  const [userData, setUserData] = useState({}); // 빈 객체로 초기화
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "author", "userid"]);

  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;

  const handleTabClick = (index) => {
    onTabClick(index);
  };

  const renderTabClass = (index) => {
    return activeTab === index
      ? "MyInfoMainTabTdActive"
      : "MyInfoMainTabTdDefault";
  };

  function formatPhoneNumber(phoneNumber) {
    // 입력된 문자열에서 숫자만 추출
    const numericString = phoneNumber.replace(/\D/g, "");

    // 숫자를 원하는 형식으로 포맷
    const formattedPhoneNumber = numericString.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );

    return formattedPhoneNumber;
  }

  const handleMemberDelete = () => {
    const userConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    // 토큰 값이나 다른 필요한 정보를 이용하여 DELETE 요청을 보냄
    if (userConfirmed) {
      axios
        .delete("http://localhost:8000/member/drop", {
          headers: {
            Authorization: `${token}`, // 토큰을 헤더에 추가
          },
        })
        .then((response) => {
          // 탈퇴 성공 시 로직
          alert("회원 탈퇴가 성공적으로 처리되었습니다.");
          removeCookie("token");
          removeCookie("author");
          removeCookie("userid");
          navigate("/");
          // 이후 필요한 로직 수행 (예: 로그아웃 등)
        })
        .catch((error) => {
          // 에러 핸들링 로직
          console.error("회원 탈퇴에 실패했습니다.", error);
        });
    } else {
      alert("탈퇴가 취소되었습니다.");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/member/search?id=${userid}`)
      .then((response) => {
        const userData = response.data.found[0]; // found 배열의 첫 번째 요소
        setUserData(userData);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  return (
    <div className="MyInfoSearchWrap">
      <div className="MyInfoSearchWrapDiv">
        <h3>
          <img src="./image/MyInfoSearch.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="MyInfoSearchMainWrap">
        <div className="MyInfoSearchMainIntro">
          <div className="MyInfoSearchMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="MyInfoSearchMainIntroSpan">{userid}</span>
          님의 정보입니다.
        </div>
        <div className="MyInfoSearchMainContentsWrap">
          <table>
            <tr>
              <td>아이디</td>
              <td>{userData ? userData.id : "로딩 중..."}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>{userData ? userData.email : "로딩 중..."}</td>
            </tr>
            <tr>
              <td>이름</td>
              <td>{userData ? userData.name : "로딩 중..."}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <td>
                  {userData && userData.mobile
                    ? formatPhoneNumber(userData.mobile)
                    : "로딩 중..."}
                </td>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="MyInfoSearchBtnWrap">
        <div className="MyInfoSearchBtnGoUpdate">
          <button
            className={`MyInfoMainTabTdActive ${renderTabClass(1)}`}
            onClick={() => handleTabClick(1)}
          >
            내 정보 수정
          </button>
        </div>
        <div className="MyInfoSearchBtnGoExit">
          <button onClick={handleMemberDelete}>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoSearch;
