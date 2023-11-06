import React, { useState } from "react";
import "./AdminReportAnswer.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const AdminReportAnswer = () => {
  const [context, setcontext] = useState("");
  const [cookies] = useCookies(["token"]);
  const location = useLocation();
  const { reportId, reporterId, reportTitle } = location.state;

  const handleSubmit = () => {
    if (!context.trim()) {
      window.alert("답변을 입력하세요.");
      return;
    }
    const data = {
      report_id: reportId,
      content: context,
    };
    const url = "http://localhost:8000/report/reply";
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
          window.alert("신고/문의 답변이 성공적으로 등록되었습니다.");
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        window.alert("신고글 등록 중 오류가 발생했습니다.");
        console.error("신고글 등록 중 오류가 발생했습니다.", error);
      });
  };

  const handleCancel = () => {
    const previousPageURL = document.referrer; // 이전 페이지 URL 가져오기
    window.location.href = previousPageURL;
  };

  return (
    <div className="AdminReportAnswerpage-container">
      <label className="AdminReportAnswerlabel">신고자 ID: {reporterId}</label>
      <br />
      <label className="AdminReportAnswerlabel">신고 제목: {reportTitle}</label>
      <br />
      <textarea
        className="AdminReportAnswertextarea"
        placeholder="답변을 입력하세요."
        value={context}
        onChange={(e) => setcontext(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>확인</button>
      <br />
      <button className="AdminReportAnswercancel-button" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
};

export default AdminReportAnswer;
