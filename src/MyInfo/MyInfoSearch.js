import React, { useState } from "react";
import "./MyInfoSearch.css";

const MyInfoSearch = (props) => {
  const { activeTab, onTabClick } = props;

  const handleTabClick = (index) => {
    onTabClick(index);
  };

  const renderTabClass = (index) => {
    return activeTab === index
      ? "MyInfoMainTabTdActive"
      : "MyInfoMainTabTdDefault";
  };

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
          <span className="MyInfoSearchMainIntroSpan">이우찬</span>
          님의 정보입니다.
        </div>
        <div className="MyInfoSearchMainContentsWrap">
          <table>
            <tr>
              <td>아이디</td>
              <td>받아올 데이터</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>받아올 데이터</td>
            </tr>
            <tr>
              <td>이름</td>
              <td>받아올 데이터</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>받아올 데이터</td>
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
          <button>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoSearch;
