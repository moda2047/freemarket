import React, { useState } from "react";
import "./ReportWrite.css";
import axios from "axios";
import { useCookies } from "react-cookie";
function ReportWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookies] = useCookies(["token"]);

  const handleReportWrite = () => {
    const data = {
      title: title,
      content: content,
    };
    const url = "http://localhost:8000/report/register";
    const headers = {
      headers: {
        Authorization: cookies.token,
        ContentType: "application/json",
        Accept: "application/json",
      },
    };

    axios
      .post(url, data, headers)

      .then((response) => {
        console.log(response);
        if (response.data.result) {
          window.alert("신고/문의글이 성공적으로 등록되었습니다.");
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
          console.log("제목:", data.title);
          console.log("내용:", data.content);
          console.log("제목:", title);
          console.log("내용:", content);
          console.log(cookies.token);
          console.log(response.data.receivedData.title);
          console.log(response.data.receivedData.content);
        }
      })
      .catch((error) => {
        window.alert("신고글 등록 중 오류가 발생했습니다.");
        console.error("신고글 등록 중 오류가 발생했습니다.", error);
      });
  };
  return (
    <div className="MyReportMSListWrap">
      <div className="MyReportMSListWrapDiv">
        <h3>
          <img src="./image/MyInfoReviewIwImg.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="MyReportWriteContainer">
        <h2>신고/문의 글 작성</h2>
        <div>
          <label htmlFor="title">제목 : </label>
          <input
            className="MyReportWriteInput"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="MyReportWriteLabel" htmlFor="content">
            내용:
          </label>
          <textarea
            className="MyReportWriteTextarea"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          className="MyReportWriteSubmit-Button"
          onClick={handleReportWrite}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default ReportWrite;
