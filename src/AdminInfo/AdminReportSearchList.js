import React, { useState } from "react";
import "./AdminReportSearchList.css";
import AdminReportSearch from "./AdminReportSearch";

function AdminReportSearchList() {
  const [reports, setReports] = useState([
    {
      id: 1,
      status: 0,
      title: "문의 제목 1",
      author: "사용자 1",
      date: "2023-10-17",
      details: "문의 내용 1",
    },
    {
      id: 2,
      status: 1,
      title: "문의 제목 2",
      author: "사용자 2",
      date: "2023-10-18",
      details: "문의 내용 2",
    },
    {
      id: 3,
      status: 1,
      title: "문의 제목 2",
      author: "사용자 2",
      date: "2023-10-18",
      details: "문의 내용 2",
    },
    {
      id: 4,
      status: 1,
      title: "문의 제목 2",
      author: "사용자 2",
      date: "2023-10-18",
      details: "문의 내용 2",
    },
    {
      id: 5,
      status: 1,
      title: "문의 제목 2",
      author: "사용자 2",
      date: "2023-10-18",
      details: "문의 내용 2",
    },
    // 다른 신고/문의 항목 추가
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const getStatusText = (status) => {
    return status === 0 ? "미해결" : "해결";
  };

  const handleTitleClick = (report) => {
    setSelectedReport(report.id === selectedReport ? null : report.id);
  };

  return (
    <div className="AdminRSListWrap">
      <div className="AdminRSListWrapDiv">
        <h3>
          <img src="./image/AdminReportSearchListIcon.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="AdminRSListMainWrap">
        <div className="AdminRSListMainIntro">
          <div className="AdminRSListMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="AdminRSListMainIntroSpan">신고/문의 목록 조회</span>
        </div>
        <div>
          <table className="AdminRSListSearchTable">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="40%" />
              <col width="10%" />
              <col width="auto" />
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
                  <td>{report.author}</td>
                  <td>{report.date}</td>
                </tr>
                {selectedReport === report.id && (
                  <tr>
                    <td colSpan="5">
                      <AdminReportSearch
                        reporterId={report.author}
                        reportTitle={report.title}
                        reportContent={report.details}
                        status={report.status}
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

export default AdminReportSearchList;
