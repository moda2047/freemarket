import React, { useState } from "react";
import "./AdminReportSearch.css";

function AdminReportSearch({ reporterId, reportTitle, reportContent, status }) {
  const [replyContent, setReplyContent] = useState("");

  const openNewPage = () => {
    window.open("/AdminReportAnswer", "_blank");
  };

  return (
    <div className="AdminReportSearchreport-page">
      <h1>신고글 조회 페이지</h1>
      <p>신고자 ID: {reporterId}</p>
      <p>신고 제목: {reportTitle}</p>
      <p>신고 내용: {reportContent}</p>

      {status === 1 ? (
        <div>
          <h2>답변 내용:</h2>
          <p>
            이 신고에 대한 답변 내용입니다. 더 자세한 정보를 여기에 추가할 수
            있습니다. 나중에 replyContent를 받아와서 보여줌.
          </p>
        </div>
      ) : (
        <div>
          <button
            onClick={openNewPage}
            className="AdminReportSearchreply-button"
          >
            답변 쓰러 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminReportSearch;
