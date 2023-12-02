import React, { useState } from "react";
import "./AdminSidebar.css";

const AdminSidebar = (props) => {
  const { activeTab, onTabClick } = props;

  const handleTabClick = (index) => {
    onTabClick(index);
  };

  const renderTabClass = (index) => {
    return activeTab === index
      ? "AdminInfoMainTabTdActive"
      : "AdminInfoMainTabTdDefault";
  };

  return (
    <div className="AdminSidebarWrap">
      <div className="AdminSidebarMyInfoWrap">
        <div className="AdminSidebarMyPage">
          <h3>
            <img
              className="AdminSidebarImg"
              src="./image/kumohMarketAdminpage.png"
              alt="nono"
            ></img>
          </h3>
          <div className="AdminSidebarLevel">
            <div className="AdminSidebarText">
              <span className="AdminSidebarTextName">관리자</span>님 안녕하세요!
            </div>
          </div>
        </div>
        <div className="AdminSidebarInWrap">
          <div className="AdminSidebarInWrapDiv">
            <h3>신고</h3>
            <ul>
              <li
                className={`AdminInfoMainTabTdActive ${renderTabClass(0)}`}
                onClick={() => handleTabClick(0)}
              >
                신고/문의 조회
              </li>
            </ul>
          </div>
          <div className="AdminSidebarInWrapDiv">
            <h3>회원</h3>
            <ul>
              <li
                className={`AdminInfoMainTabTdActive ${renderTabClass(1)}`}
                onClick={() => handleTabClick(1)}
              >
                회원 목록 조회
              </li>
              <li
                className={`AdminInfoMainTabTdActive ${renderTabClass(2)}`}
                onClick={() => handleTabClick(2)}
              >
                제제당한 회원 목록 조회
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
