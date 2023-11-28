import React, { useState } from "react";
import ChatList from "./ChatList.js";
import ChatDetail from "./ChatDetail.js";

import "./ChatMain.css"; // CSS 파일 가져오기

function ChatMain() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState(null); // 선택한 채팅 데이터 상태 추가

  const handleChatItemClick = (chatId, chatData) => {
    setSelectedChatId(chatId); // 클릭한 채팅의 ID를 상태에 저장
    setSelectedChatData(chatData); // 클릭한 채팅의 데이터를 상태에 저장
  };
  return (
    <>
      <div className="ChatMainWrap">
        <div className="ChatMainSidebar">
          {/* ChatList에 setSelectedChatId 전달 */}
          <ChatList
            onChatItemClick={handleChatItemClick}
            setSelectedChatId={setSelectedChatId}
            setSelectedChatData={setSelectedChatData} // ChatMain에 선택한 채팅 데이터 전달
          />
        </div>
        <div className="ChatMainMajorWrap">
          {/* ChatDetail에 selectedChatId 전달 */}
          <ChatDetail chatRoomId={selectedChatId} chatData={selectedChatData} />
        </div>
      </div>
    </>
  );
}

export default ChatMain;
