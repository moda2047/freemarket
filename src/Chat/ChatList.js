import React from "react";
import "./ChatList.css";

// 더미 데이터
const dummyChatList = [
  { id: 1, productName: "상품 1", partnerId: "user123" },
  { id: 2, productName: "상품 2", partnerId: "user456" },
  { id: 3, productName: "상품 3", partnerId: "user789" },
];

const ChatList = ({ userId }) => {
  return (
    <div>
      <h1>채팅 목록</h1>
      <ul>
        {dummyChatList.map((chat) => (
          <li key={chat.id} className="chat-list-item">
            <h2>{chat.productName}</h2>
            <p>{`상대방: ${chat.partnerId}`}</p>
            <button onClick={() => handleChatClick(chat.id)}>채팅 열기</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const handleChatClick = (chatId) => {
    // 클릭한 채팅방을 처리하는 로직을 추가하세요
  };
};

export default ChatList;
