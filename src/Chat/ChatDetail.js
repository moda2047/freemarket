import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatDetail.css"; // CSS 파일을 import

const ChatDetail = ({ chatRoomId, chat }) => {
  const [cookies] = useCookies(["token", "userid"]);
  const myID = cookies.userId || "";

  const [newMessage, setNewMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("Received chat data:", chat);
    const mailAuthAPI = `http://localhost:8000/chatRoom?chatRoomId=${chatRoomId}`;
    const token = cookies.token;

    const newSocket = io(mailAuthAPI, {
      extraHeaders: {
        Authorization: token,
      },
    });

    newSocket.on("connect_error", (error) => {
      console.error("소켓 연결 에러:", error);
    });

    newSocket.on("connect", () => {
      console.log("채팅방 소켓이 연결되었습니다.");
      setSocket(newSocket);
    });

    newSocket.emit("chatMessages", { chatRoomId });

    newSocket.on("chatMessages", (data) => {
      console.log("이전 채팅 메시지들:", data);
      setChatData(data);
    });

    return () => {
      console.log("소켓 연결이 해제되었습니다.");
      newSocket.disconnect();
    };
  }, [chatRoomId, cookies.token]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleConfirmPurchase = () => {
    alert("구매가 확정되었습니다!");
  };

  const handleSendMessage = () => {
    if (socket) {
      if (newMessage.trim() !== "") {
        const newMessageData = {
          message: newMessage,
        };

        socket.emit("chat", newMessageData);
        setNewMessage("");
        console.log("data 전송이 완료됨.", newMessageData);
      } else {
        console.error("메시지가 비어 있습니다.");
      }
    } else {
      console.error("소켓 연결이 이루어지지 않았습니다.");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        console.log("새로운 메시지 도착:", newMessage);
        setChatData((prevChatData) => [...prevChatData, newMessage]);
      });
    }
  }, [socket]);

  return (
    <div className="ChatDetailContainer">
      <div className="ChatDetailProductInfo">
        <h2>상품</h2>
        <p>판매자: chat.seller_id</p>
        <button onClick={handleConfirmPurchase}>구매확정</button>
      </div>
      <div className="ChatDetailmessages">
        {chatData.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender_id === cookies.userid ? "sent" : "received"
            }`}
          >
            <div className="ChatDetailmessage-text">{message.content}</div>
            <div className="ChatDetailmessage-timestamp">
              {message.createdAt}
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
