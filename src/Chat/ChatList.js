import "./ChatList.css";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatList = ({ onChatItemClick, setSelectedChatId }) => {
  const [cookies] = useCookies(["token", "userid"]);
  const [chatRooms, setChatRooms] = useState([]);
  const myID = cookies.userId || "";
  const mailAuthAPI = "http://localhost:8000/chatRoomList";
  const token = cookies.token;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(mailAuthAPI, {
      extraHeaders: {
        Authorization: token,
      },
    });
    newSocket.on("connect_error", (error) => {
      console.error("소켓 연결 에러:", error);
    });

    newSocket.on("connect", () => {
      console.log("소켓이 연결되었습니다.");
      setSocket(newSocket);
    });
    newSocket.on("chatRoomList", (data) => {
      console.log("서버로부터 받은 메시지:", data);
      setChatRooms(data);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      console.log("소켓 연결이 해제되었습니다.");
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("newChatRoom", (data) => {
        console.log("새로운 채팅방 도착:", data);
        setChatRooms((prevChatData) => [...prevChatData, data]);
      });
    }
  }, [socket]);
  const handleChatClick = (chatId, chat) => {
    setSelectedChatId(chatId); // 클릭한 채팅의 ID를 설정
    onChatItemClick(chatId, chat); // 클릭한 채팅의 ID와 데이터를 부모 컴포넌트로 전달
  };
  const getOtherUserID = (chat) => {
    if (cookies.userid === chat.seller_id) {
      return chat.buyer_id;
    } else {
      return chat.seller_id;
    }
  };
  const check = (chat) => {
    if (cookies.userid === chat.seller_id) {
      return chat.chat_room.seller_unread;
    } else {
      return chat.chat_room.buyer_unread;
    }
  };
  return (
    <div className="chat-list-container">
      <h1>채팅 목록</h1>
      <ul className="chat-list">
        {chatRooms.map((chat) => (
          <li
            key={chat.id}
            className="chat-list-item"
            onClick={() => handleChatClick(chat.id, chat)}
          >
            <h2>
              {chat.product && chat.product.title
                ? chat.product.title
                : getOtherUserID(chat)}
            </h2>
            <div className="chat-list-item-box">
              <p id="opponent_id">{`상대방: ${getOtherUserID(chat)}`}</p>
              <p id="unread_message">{`${check(chat)}`}</p>
            </div>

            <button
              id="chat_open_btn"
              onClick={() => handleChatClick(chat.id, chat)}
            >
              채팅 열기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
