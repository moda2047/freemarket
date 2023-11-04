import React, { useState } from "react";
import "./AdminReportAnswer.css";

const dummyData = {
  reporterid: "전승기",
  reporttitle: "불법 신고 합니다.",
};

const AdminReportAnswer = () => {
  const [reporterid] = useState(dummyData.reporterid);
  const [reporttitle] = useState(dummyData.reporttitle);
  const [context, setcontext] = useState("");

  const handleSubmit = () => {
    // 확인 버튼 클릭 시 실행될 로직을 작성하세요.
    // 신고자id, 신고제목, 내용을 사용하여 처리합니다.
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 실행될 로직을 작성하세요.
  };

  return (
    <div className="AdminReportAnswerpage-container">
      <label className="AdminReportAnswerlabel">신고자 ID: {reporterid}</label>
      <br />
      <label className="AdminReportAnswerlabel">신고 제목: {reporttitle}</label>
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
