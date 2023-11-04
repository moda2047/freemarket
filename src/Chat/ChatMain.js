import React, { useState } from "react";
import ChatList from "./ChatList.js";
import ChatDetail from "./ChatDetail.js";
import Header from "./Header.js";

import "./ChatMain.css"; // CSS 파일 가져오기

function ChatMain() {
  return (
    <>
      <div className="ChatMainWrap">
        <div className="ChatHeader">chat헤더{/* <AdminHeader /> */}</div>
        <div className="ChatMainSidebar">
          <ChatList />
        </div>
        <div className="ChatMainMajorWrap">
          <ChatDetail />
        </div>
      </div>
    </>
  );
}

export default ChatMain;
