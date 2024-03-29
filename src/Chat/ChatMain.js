import React, { useState, useEffect } from "react";
import ChatList from "./ChatList.js";
import ChatDetail from "./ChatDetail.js";
import { useLocation } from "react-router-dom";
import "./ChatMain.css"; // CSS 파일 가져오기

function ChatMain(props) {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState(null); // 선택한 채팅 데이터 상태 추가
  const [newestChatRoom, setNewestChatRoom] = useState(null);
  const location = useLocation();
  const chatDataFromProductDetail = location.state
    ? location.state.chatData
    : null;

  useEffect(() => {
    if (chatDataFromProductDetail) {
      setSelectedChatId(chatDataFromProductDetail.chatAttend.chat_room_id);
      setSelectedChatData(chatDataFromProductDetail.chatAttend);
    }
  }, [chatDataFromProductDetail]);
  const handleChatItemClick = (chatId, chat) => {
    setSelectedChatId(chatId); // 클릭한 채팅의 ID를 상태에 저장
    setSelectedChatData(chat); // 클릭한 채팅의 데이터를 상태에 저장
  };

  return (
    <>
      <div className="ChatMainWrap">
        <div className="ChatMainSidebar">
          {/* ChatList에 setSelectedChatId 및 선택된 채팅 데이터 전달 */}
          <ChatList
            onChatItemClick={handleChatItemClick}
            setSelectedChatId={setSelectedChatId}
            setSelectedChatData={setSelectedChatData} // Chat 데이터 설정 함수 전달
            newestChatRoom={newestChatRoom}
          />
        </div>
        <div className="ChatMainMajorWrap">
          {/* ChatDetail에 selectedChatId 및 선택된 채팅 데이터 전달 */}
          <ChatDetail
            chatRoomId={selectedChatId}
            chat={selectedChatData}
            setNewestChatRoom={setNewestChatRoom}
          />
        </div>
      </div>
    </>
  );
}

export default ChatMain;
