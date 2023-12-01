import { useRef, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import "./ChatDetail.css";
import axios from "axios";

const ChatDetail = ({ chatRoomId, chat }) => {
  const [cookies] = useCookies(["token", "userid"]);
  const myID = cookies.userId || "";
  const [newMessage, setNewMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
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
      console.log("채팅방 소켓 연결이 해제되었습니다.");
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
            window.alert(response.data.message);
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          window.alert("상품 구매 확정 중 오류.");
          console.error("상품 구매 확정 중 오류", error);
        });
    }
  };
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const handleSendMessage = () => {
    if (socket) {
      if (newMessage.trim() !== "") {
        const newMessageData = {
          message: newMessage,
        };
        const newMessageData2 = {
          content: newMessage,
          sender_id: cookies.userid,
          createdAt: getFormattedDate(),
          unread: 1,
        };

        // Show the user's message on the screen before sending
        setChatData((prevChatData) => [...prevChatData, newMessageData2]);

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

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);
  const formatReceivedDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedDate.replace(",", ""); // Remove comma between date and time
  };
  const getOtherUserID = (chat) => {
    if (cookies.userid === chat.seller_id) {
      return chat.buyer_id;
    } else {
      return chat.seller_id;
    }
  };

  return (
    <div className="ChatDetailContainer">
      <div className="ChatDetailProductInfo">
        {chat && chat.product && chat.product.title !== null ? (
          <>
            <h2>{chat.product.title}</h2>
            <p>판매자: {chat.seller_id}</p>
            <button onClick={handleConfirmPurchase}>구매확정</button>
          </>
        ) : (
          <>
            <h2>{chat && getOtherUserID(chat)}</h2>
            {chat && chat.seller_id && <p>판매자: {chat.seller_id}</p>}
          </>
        )}
      </div>
      <div ref={chatContainerRef} className="ChatDetailmessages">
        {chatData.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender_id === cookies.userid ? "sent" : "received"
            }`}
          >
            <div
              className={`${message.unread === 1 ? "unread" : ""}`}
              data-unread={message.unread}
            ></div>
            <div className="ChatDetailmessage-text">{message.content}</div>
            <div className="ChatDetailmessage-timestamp">
              {formatReceivedDate(message.createdAt)}
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
