import React, { useState, useEffect } from "react";
import "./AdminMemberRestriction";
import axios from "axios";
import { useCookies } from "react-cookie";

function AdminMemberList() {
  const [members, setMembers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const mailAuthAPI =
      process.env.REACT_APP_API_URL + "/sanction/searchForAdmin";
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
          setMembers(foundArray);
          setTotalCount(response.data.totalCount);
          setData(data);
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
    const filteredMembers = members.filter((member) => {
      const memberName = (member.target_id || "").toString().toLowerCase(); // 이름 속성으로 변경
      const memberEmail = (member.target_email || "").toString().toLowerCase(); // 이메일 속성으로 변경

      // 검색어 및 멤버 이름과 이메일이 유효한지 확인
      if (memberName && memberEmail && searchQuery) {
        return (
          memberName.includes(searchQuery.toLowerCase()) ||
          memberEmail.includes(searchQuery.toLowerCase())
        );
      }
      return false;
    });

    if (filteredMembers.length === 0) {
      alert("검색 결과가 없습니다.");
    } else {
      setMembers(filteredMembers);
    }
  };

  const handleSanction = (memberId) => {
    const userConfirmed = window.confirm("정말로 취소하시겠습니까?");

    if (userConfirmed) {
      const url =
        process.env.REACT_APP_API_URL +
        `/sanction/cancel?sanctionId=${memberId}`;
      const data = {
        sanctionId: memberId,
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
            window.alert("제재가 취소되었습니다.");
            console.log(response.data.message);

            fetchData();
          } else {
            console.log(response.data.message);
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("제재 취소에 문제가 생겼습니다..", error);
          console.error("Error status: ", error.response.status);
          console.error("Error data: ", error.response.data);
        });
    }
  };
  return (
    <div className="AdminMListWrap">
      <div className="AdminMListWrapDiv">
        <h3>
          <img src="./image/AdminMemberRestrictionList.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="AdminMListMainWrap">
        <div className="AdminMListMainIntro">
          <span className="AdminMListMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            제재 당한 회원 목록 조회
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
              placeholder="Name또는 Email로 검색"
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
              <col width="7%" />
              <col width="13%" />
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="auto" />
            </colgroup>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>제재 사유</th>
              <th>제재 기간</th>
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
                  <td>{member.target_id}</td>
                  <td>{member.target_email}</td>
                  <td>{member.reason}</td>
                  <td>{member.expire_at}</td>
                  <td>
                    <button
                      className="AdminMemberList-button"
                      onClick={() => handleSanction(member.id)}
                    >
                      취소
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
