import React, { useState, useEffect } from "react";
import "./AdminMemberList.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AdminMemberList() {
  const [members, setMembers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const mailAuthAPI = "http://localhost:8000/member/search";
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
          const data = response.data.found;
          const foundArray = response.data.found;
          setData(data);
          setMembers(foundArray);
          setTotalCount(response.data.totalCount);
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

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Calculate the maximum page based on data length and itemsPerPage
    const maxPage = Math.ceil(data.length / itemsPerPage);

    // Ensure currentPage is within a valid range
    if (currentPage < 1 || currentPage > maxPage) {
      setCurrentPage((prevPage) => Math.min(Math.max(prevPage, 1), maxPage));
    }
    console.log(currentPage);
  }, [currentPage, data.length, itemsPerPage]);

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    const filteredMembers = members.filter(
      (member) =>
        member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredMembers.length === 0) {
      // 검색 결과가 없는 경우
      alert("검색 결과가 없습니다.");
    } else {
      setMembers(filteredMembers);
    }
  };

  const handleSanction = (memberId) => {
    navigate("/AdminMemberRestriction", {
      state: {
        memberId,
      },
    });
  };
  return (
    <div className="AdminMListWrap">
      <div className="AdminMListWrapDiv">
        <h3>
          <img src="./image/AdminMemberListMain.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="AdminMListMainWrap">
        <div className="AdminMListMainIntro">
          <span className="AdminMListMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            회원 목록 조회
          </span>
        </div>
        <div>
          <div className="AdminMemberListSearchButton">
            <button
              className="AdminMemberListSearchCheck"
              onClick={handleSearch}
            >
              검색
            </button>
            <input
              className="AdminMemberListSearchInput"
              type="text"
              placeholder="ID 또는 Name으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                float: "right",
                width: "150px",
              }}
              maxLength="15"
            />
          </div>

          <table className="AdminMListSearchTable">
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="30%" />
              <col width="25%" />
              <col width="auto" />
            </colgroup>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>

            {members
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.mobile}</td>
                  <td>
                    <button
                      className="AdminMemberList-button"
                      onClick={() => handleSanction(member.id)}
                    >
                      제재
                    </button>
                  </td>
                </tr>
              ))}
          </table>
          <div className="MyBuyListPagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>{currentPage}</span>
            <button
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(totalCount / itemsPerPage)}
            >
              다음
            </button>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default AdminMemberList;
