import React, { useEffect, useState } from "react";
import "./MyInfoMain.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import MyInfoSidebar from "./MyInfoSidebar.js";
import MyInfoSearch from "./MyInfoSearch.js";
import MyInfoUpdate from "./MyInfoUpdate.js";
import MyBuyList from "./MyBuyList.js";
import MySalList from "./MySalList.js";
import MyInfoReviewIw from "./MyInfoReviewIw.js";
import MyInfoReviewYw from "./MyInfoReviewYw.js";
import ReportWrite from "./ReportWrite.js";
import ReportMySearchList from "./ReportMySearchList.js";
import MyInfoPasswordCorrect from "../PasswordChange/MyInfoPasswordCorrect.js";
import WishList from "../WishList/WishList.js";
const MyInfoMain = (props) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    console.log("activeTab is now:", activeTab); // 추가한 콘솔 로그
  };

  return (
    <>
      <div className="MyInfoMainWrap">
        <div className="MyInfoHeader"></div>
        <div className="MyInfoMainSidebarContainer">
          <MyInfoSidebar activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
        <div className="MyInfoMainMajorWrap">
          {activeTab === 0 && (
            <MyInfoSearch activeTab={activeTab} onTabClick={handleTabClick} />
          )}
          {activeTab === 1 && <MyInfoUpdate />}
          {activeTab === 2 && <WishList />}
          {activeTab === 3 && <MyBuyList />}
          {activeTab === 4 && <MySalList />}
          {activeTab === 5 && <MyInfoReviewIw />}
          {activeTab === 6 && <MyInfoReviewYw />}
          {activeTab === 7 && <ReportWrite />}
          {activeTab === 8 && <ReportMySearchList />}
        </div>
      </div>
    </>
  );
};

export default MyInfoMain;
