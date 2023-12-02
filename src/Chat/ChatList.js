import "./ChatList.css";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatList = ({ onChatItemClick, setSelectedChatId, newestChatRoom }) => {
  const [cookies] = useCookies(["token", "userid"]);
  const [chatRooms, setChatRooms] = useState([]);
  const [unread, setUnread] = useState({ chatRoomId: 0, count: 0 });
  const token = cookies.token;
  const chatRoomListAPI = process.env.REACT_APP_API_URL + "/chatRoomList";
  let chatListSocket;

  useEffect(() => {
    chatListSocket = io(chatRoomListAPI, {
      extraHeaders: {
        Authorization: token,
      },
    });

    chatListSocket.on("connect", () => {
      console.log("소켓이 연결되었습니다.");
    });

    chatListSocket.on("disconnect", () => {
      console.log("소켓 연결이 종료되었습니다.");
    });

    chatListSocket.on("chatRoomList", (data) => {
      console.log("클라이언트로부터 받은 메시지:", data);
      setChatRooms(data);
    });

    chatListSocket.on("unread", (unreadInfo) => {
      console.log("읽지 않은 메시지:", unreadInfo);
      setUnread({
        chatRoomId: unreadInfo.chat_room_id,
        count: unreadInfo.count,
      });
    });

    chatListSocket.on("newChatRoom", (data) => {
      console.log("새로운 채팅방 도착:", data);
      setChatRooms((prevChatData) => [data, ...prevChatData]);
    });

    chatListSocket.on("connect_error", (error) => {
      console.error("소켓 연결 에러:", error);
    });

    return () => {
      chatListSocket.disconnect();
      console.log("채팅방 목록 소켓 연결이 해제되었습니다.");
    };
  }, []);

  useEffect(() => {
    raiseChatRoom(newestChatRoom);
  }, [newestChatRoom]);

  useEffect(() => {
    unreadChatRoom(unread.chatRoomId, unread.count);
  }, [unread]);

  const unreadChatRoom = (roomId, newCount) => {
    const targetId = Number(roomId);
    const count = Number(newCount);

    const raiseIdx = chatRooms.findIndex(
      (chatRoom) => chatRoom.id === targetId
    );

    if (raiseIdx === -1) {
      return;
    }

    const updatedChatRooms = [...chatRooms];
    if (updatedChatRooms[raiseIdx].seller_id === cookies.userid) {
      updatedChatRooms[raiseIdx].chat_room.seller_unread = count;
    } else if (updatedChatRooms[raiseIdx].buyer_id === cookies.userid) {
      updatedChatRooms[raiseIdx].chat_room.buyer_unread = count;
    }

    if (raiseIdx === 0) {
      return setChatRooms(updatedChatRooms);
    }

    const chatToRaise = updatedChatRooms.splice(raiseIdx, 1)[0];
    updatedChatRooms.unshift(chatToRaise);
    setChatRooms(updatedChatRooms);
  };

  const raiseChatRoom = (roomId) => {
    const raiseIdx = chatRooms.findIndex((chatRoom) => chatRoom.id === roomId);
    if (raiseIdx < 1) return;
    const updatedChatRooms = [...chatRooms];
    const chatToRaise = updatedChatRooms.splice(raiseIdx, 1)[0];
    updatedChatRooms.unshift(chatToRaise);
    setChatRooms(updatedChatRooms);
  };

  const readChatRoom = (roomId) => {
    const raiseIdx = chatRooms.findIndex((chatRoom) => chatRoom.id === roomId);

    const updatedChatRooms = [...chatRooms];
    if (updatedChatRooms[raiseIdx].seller_id === cookies.userid) {
      updatedChatRooms[raiseIdx].chat_room.seller_unread = 0;
    } else if (updatedChatRooms[raiseIdx].buyer_id === cookies.userid) {
      updatedChatRooms[raiseIdx].chat_room.buyer_unread = 0;
    }

    setChatRooms(updatedChatRooms);
  };

  const handleChatClick = (chatId, chat) => {
    setSelectedChatId(chatId); // 클릭한 채팅의 ID를 설정
    onChatItemClick(chatId, chat); // 클릭한 채팅의 ID와 데이터를 부모 컴포넌트로 전달
    readChatRoom(chatId);
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
              {check(chat) < 1 ? null : (
                <p id="unread_message">{`${check(chat)}`}</p>
              )}
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
