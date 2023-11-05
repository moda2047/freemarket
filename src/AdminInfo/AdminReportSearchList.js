import React, { useState, useEffect } from "react";
import "./AdminReportSearchList.css";
import AdminReportSearch from "./AdminReportSearch";
import axios from "axios";
import { useCookies } from "react-cookie";

function AdminReportSearchList() {
  const [cookies] = useCookies(["token"]);
  const [reports, setReports] = useState([]);
  const fetchData = async () => {
    const mailAuthAPI = "http://localhost:8000/report/searchForAdmin";
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
                  <td>{report.reporter_id}</td>
                  <td>{report.createdAt}</td>
                </tr>
                {selectedReport === report.id && (
                  <tr>
                    <td colSpan="5">
                      <AdminReportSearch
                        reportId={report.id}
                        reporterId={report.reporter_id}
                        reportTitle={report.title}
                        reportContent={report.content}
                        status={report.status}
                        reportReplies={report.report_replies}
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
