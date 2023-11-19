import React, { useState, useEffect } from "react";
import "./MyInfoSidebar.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const MyInfoSidebar = (props) => {
  const { activeTab, onTabClick } = props;
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
              <span className="MyInfoSidebarTextName">{userid}</span>
              님의 거래건수는
              <br />
              <span className="MyInfoSidebarTextTransNum">0</span>건 입니다.
            </div>
          </div>
          <div className="MyInfoSidebarPointBox">
            <ul>
              <li>
                <div className="MyInfoSidebarPointBoxDiv">
                  <div className="MyInfoSidebarPointTitle">Point</div>
                  <div className="MyInfoSidebarPointInt">
                    <span className="MyInfoSidebarPointSpan">0</span>P
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
            <h3>찜 목록</h3>
            <ul>
              <li className={`MyInfoMainTabTdActive ${renderTabClass(2)}`}>
                <Link className="MyInfoSidebarWishListLink" to="/WishList">
                  찜 목록 조회
                </Link>
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
