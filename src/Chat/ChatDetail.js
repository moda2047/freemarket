import React, { useState } from "react";
import "./ChatDetail.css"; // CSS 파일을 import

const ChatDetail = () => {
  // 더미 데이터 예시 (실제 데이터로 대체 필요)
  const product = { name: "상품 이름 예시" };
  const seller = { name: "판매자 이름 예시" };

  const [newMessage, setNewMessage] = useState("");
  const [chatData, setChatData] = useState([
    { id: 1, sender: "Alice", message: "안녕하세요!", timestamp: "10:00 AM" },

    {
      id: 3,
      sender: "Alice",
      message: "저는 잘 지내고 있어요!",
      timestamp: "10:10 AM",
    },
  ]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Enter 키를 눌렀을 때 메시지 전송
      handleSendMessage();
    }
  };
  const handleConfirmPurchase = () => {
    alert("구매가 확정되었습니다!");
  };

  const handleSendMessage = () => {
    const newMessageData = {
      id: chatData.length + 1,
      sender: "You",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatData([...chatData, newMessageData]);
    setNewMessage("");
  };

  return (
    <div className="ChatDetailContainer">
      <div className="ChatDetailProductInfo">
        <h2>{product.name}</h2>
        <p>판매자: {seller.name}</p>
        <button onClick={handleConfirmPurchase}>구매확정</button>
      </div>
      <div className="ChatDetailmessages">
        {chatData.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "You" ? "sent" : "received"
            }`}
          >
            <div className="ChatDetailmessage-text">{message.message}</div>
            <div className="ChatDetailmessage-timestamp">
              {message.timestamp}
            </div>
          </div>
        ))}
      </div>
      <div className="ChatDetail-input">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatDetail;
