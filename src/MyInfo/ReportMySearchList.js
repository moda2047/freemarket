import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./ReportMySearchList.css";
import ReportMySearch from "./ReportMySearch.js";

function ReportMySearchList() {
  const [cookies] = useCookies(["token"]);
  const [reports, setReports] = useState([]);
  const handleReportDelete = (reportId) => {
    // 신고/문의 삭제 API 호출 및 상태 업데이트
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
  };
  const fetchData = async () => {
    const mailAuthAPI = "http://localhost:8000/report/searchForMember";
    const headers = {
      headers: {
        Authorization: cookies.token,
        ContentType: "application/json",
        Accept: "application/json",
      },
    };
    console.log("fetchData 함수가 실행됩니다.");
    console.log(typeof cookies.token);
    axios
      .get(mailAuthAPI, headers)
      .then((response) => {
        console.log("API 응답 데이터: ", response.data);
        if (response.data.result) {
          const foundArray = response.data.found;
          setReports(foundArray);
          console.log("성공적으로 됐");
        } else {
          console.log("실패");
        }
      })
      .catch((error) => {
        console.error("오류 : ", error);
        console.error("Error status: ", error.response.status);
        console.error("Error data: ", error.response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const getStatusText = (status) => {
    return status === 0 ? "미해결" : "해결";
  };

  const handleTitleClick = (report) => {
    setSelectedReport(report.id === selectedReport ? null : report.id);
  };

  const [selectedReport, setSelectedReport] = useState(null);

  const loggedInUserId = "사용자 1";
  const filteredReports = reports.filter(
    (report) => report.reporter_id === loggedInUserId
  );

  return (
    <div className="MyReportMSListWrap">
      <div className="MyReportMSListWrapDiv">
        <h3>
          <img src="./image/AdminReportSearchListIcon.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="MyReportMSListMainWrap">
        <div className="MyReportMSListMainIntro">
          <span className="MyReportMSListMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>내
            신고/문의 목록 조회
          </span>
        </div>
        <div>
          <table className="MyReportMSListSearchTable">
            <colgroup>
              <col width="10%" />
              <col width="15%" />
              <col width="40%" />
              <col width="10%" />
              <col width="20%" />
            </colgroup>
            <tr>
              <th>번호</th>
              <th>답변 상태</th>
              <th>제목</th>
              <th>문의자</th>
              <th>등록일</th>
            </tr>
            {reports.map((report) => (
              <React.Fragment key={report.id}>
                <tr onClick={() => handleTitleClick(report)}>
                  <td>{report.id}</td>
                  <td>{getStatusText(report.status)}</td>
                  <td>{report.title}</td>
                  <td>{report.reporter_id}</td>
                  <td>{report.createdAt}</td>
                </tr>
                {selectedReport === report.id && (
                  <tr>
                    <td colSpan="5">
                      <ReportMySearch
                        reportId={report.id}
                        reporterId={report.reporter_id}
                        reportTitle={report.title}
                        reportContent={report.content}
                        status={report.status}
                        reportReplies={report.report_replies}
                        onDelete={handleReportDelete} // 삭제 함수 전달
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportMySearchList;
