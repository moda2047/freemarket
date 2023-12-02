import React, { useState, useEffect } from "react";
import "./MyInfoSidebar.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

const MyInfoSidebar = (props) => {
  const { activeTab, onTabClick } = props;
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [userData, setUserData] = useState({}); // 빈 객체로 초기화

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

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/member/search?id=${userid}&getSanction=true`
      )
      .then((response) => {
        const userData = response.data.found[0]; // found 배열의 첫 번째 요소
        setUserData(userData);
        console.log(userData);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  return (
    <div className="MyInfoSidebarWrap">
      <div className="MyInfoSidebarMyInfoWrap">
        <div className="MyInfoSidebarMyPage">
          <h3>
            <img
              className="MyInfoSidebarImg"
              src="./image/kumohMarketMypage.png"
              alt="nono"
            ></img>
          </h3>
          <div className="MyInfoSidebarLevel">
            <div className="MyInfoSidebarText">
              <span className="MyInfoSidebarTextName">{userid}</span>님
              안녕하세요.
            </div>
          </div>
          <div className="MyInfoSidebarPointBox">
            <ul>
              <li>
                <div className="MyInfoSidebarPointBoxDiv">
                  <div className="MyInfoSidebarPointTitle">평점</div>
                  <div className="MyInfoSidebarPointInt">
                    <span className="MyInfoSidebarPointSpan">
                      {userData.rating > 0
                        ? userData.rating
                        : Math.floor(userData.rating)}
                    </span>
                    점입니다.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="MyInfoSidebarInWrap">
          <div className="MyInfoSidebarInWrapDiv">
            <h3>회원 정보</h3>
            <ul>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(0)}`}
                onClick={() => handleTabClick(0)}
              >
                내 정보 조회
              </li>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(1)}`}
                onClick={() => handleTabClick(1)}
              >
                내 정보 수정
              </li>
            </ul>
          </div>
          <div className="MyInfoSidebarInWrapDiv">
            <h3>판매 중인 상품</h3>
            <ul>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(2)}`}
                onClick={() => handleTabClick(2)}
              >
                판매 중인 상품
              </li>
            </ul>
          </div>
          <div className="MyInfoSidebarInWrapDiv">
            <h3>내역 정보</h3>
            <ul>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(3)}`}
                onClick={() => handleTabClick(3)}
              >
                구매내역 조회
              </li>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(4)}`}
                onClick={() => handleTabClick(4)}
              >
                판매내역 조회
              </li>
            </ul>
          </div>
          <div className="MyInfoSidebarInWrapDiv">
            <h3>리뷰 정보</h3>
            <ul>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(5)}`}
                onClick={() => handleTabClick(5)}
              >
                내가 쓴 리뷰 조회
              </li>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(6)}`}
                onClick={() => handleTabClick(6)}
              >
                내 상점 리뷰 조회
              </li>
            </ul>
          </div>
          <div className="MyInfoSidebarInWrapDiv">
            <h3>신고</h3>
            <ul>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(7)}`}
                onClick={() => handleTabClick(7)}
              >
                신고/문의 작성
              </li>
              <li
                className={`MyInfoMainTabTdActive ${renderTabClass(8)}`}
                onClick={() => handleTabClick(8)}
              >
                신고/문의 내역 조회
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoSidebar;
