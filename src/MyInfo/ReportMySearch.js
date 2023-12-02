import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./ReportMySearch.css";
import axios from "axios";
function ReportMySearch({
  reportId,
  reporterId,
  reportTitle,
  reportContent,
  status,
  reportReplies,
  onDelete,
}) {
  const [cookies] = useCookies(["token"]);

  const handleReportDelete = () => {
    const url = process.env.REACT_APP_API_URL + `/report/delete`;
    const data = {
      report_id: reportId,
    };
    const headers = {
      headers: {
        Authorization: cookies.token,
      },
    };

    axios
      .delete(url, { data, ...headers })
      .then((response) => {
        console.log(response);
        if (response.data.result) {
          window.alert("신고/문의글이 성공적으로 삭제되었습니다.");
          console.log(response.data.message);
          onDelete(reportId);
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("신고글 삭제 중 오류가 발생했습니다.", error);
        console.error("Error status: ", error.response.status);
        console.error("Error data: ", error.response.data);
      });
  };
  return (
    <div className="AdminReportSearchreport-page">
      <h1>신고글 조회 페이지</h1>
      <p>신고자 ID: {reporterId}</p>
      <p>신고 제목: {reportTitle}</p>
      <p>신고 내용: {reportContent}</p>

      {status === 1 && reportReplies ? (
        <div>
          <h2>답변 내용:</h2>
          {reportReplies.map((reply, index) => (
            <p key={index}>{reply.content}</p>
          ))}
        </div>
      ) : null}
      <button
        className="AdminReportSearchreply-button"
        onClick={handleReportDelete}
      >
        삭제
      </button>
    </div>
  );
}
export default ReportMySearch;
