import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatDetail.css"; // CSS 파일을 import
import axios from "axios";
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
    const confirmation = window.confirm("정말로 구매확정을 하시겠습니까?");
    if (confirmation) {
      // 사용자가 확인을 선택한 경우에만 구매확정 처리를 진행합니다.
      const data = {
        chatRoomId: chatRoomId,
      };
      const url = `http://localhost:8000/chat/confirmTransaction`;
      const headers = {
        headers: {
          Authorization: cookies.token,
          ContentType: "application/json",
          Accept: "application/json",
        },
      };

      axios
        .patch(url, data, headers) // POST 대신 PATCH로 변경
        .then((response) => {
          console.log(response);
          if (response.data.result) {
            window.alert("구매가 확정되었습니다.");
            console.log(response.data.message);
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          window.alert("상품 구매 확정 중 오류.");
          console.error("상품 구매 확정 중 오류", error);
        });
    }
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
        <h2>{chat && chat.product && chat.product.title}</h2>
        <p>판매자: {chat && chat.seller_id}</p>
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
