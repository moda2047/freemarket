import "./ChatList.css";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatList = ({ onChatItemClick, setSelectedChatId }) => {
  const [cookies] = useCookies(["token", "userid"]);
  const [chatRooms, setChatRooms] = useState([]);
  const myID = cookies.userId || "";
  useEffect(() => {
    const mailAuthAPI = "http://localhost:8000/chatRoomList";
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
      console.log("소켓이 연결되었습니다.");
    });
    newSocket.on("unread", (unreadData) => {
      console.log("언리드 메시지:", unreadData);
    });
    newSocket.on("chatRoomList", (data) => {
      console.log("클라이언트로부터 받은 메시지:", data);

      // 서버에서 받은 데이터를 클라이언트 측에서 unread 및 updatedAt 기준으로 정렬
      const sortedChatRooms = data.sort((a, b) => {
        const aUnread = check(a);
        const bUnread = check(b);

        if (aUnread > 0 && bUnread === 0) {
          return -1; // unread가 있는 채팅을 위로 배치
        } else if (aUnread === 0 && bUnread > 0) {
          return 1; // unread가 없는 채팅을 밑으로 배치
        } else {
          // unread가 같은 경우에는 updatedAt을 기준으로 최신 순서로 배치
          if (a.updatedAt > b.updatedAt) {
            return -1;
          } else if (a.updatedAt < b.updatedAt) {
            return 1;
          } else {
            return 0; // 그 외의 경우에는 순서를 유지
          }
        }
      });

      setChatRooms(sortedChatRooms);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      console.log("소켓 연결이 해제되었습니다.");
      newSocket.disconnect();
    };
  }, []);

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
    <div>
      <h1>채팅 목록</h1>
      <ul>
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
            <p>{`상대방: ${getOtherUserID(chat)}`}</p>
            <p>{`unread: ${check(chat)}`}</p>

            <button onClick={() => handleChatClick(chat.id, chat)}>
              채팅 열기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
