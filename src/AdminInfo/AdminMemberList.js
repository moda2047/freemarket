import React, { useState } from "react";
import "./AdminMemberList.css";

function AdminMemberList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfFirstMember, setIndexOfFirstMember] = useState(0);
  const membersPerPage = 10;

  // Mock data
  const mockData = [
    // Sample member data
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-123-4567",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "555-987-6543",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 5,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 6,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 8,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 79,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 70,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },

    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },

    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },

    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },

    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },

    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
    {
      id: 7,
      name: "전승기",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
    },
  ];

  const filteredMembers = mockData.filter(
    (member) =>
      member.id.toString().includes(searchQuery) ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastMember = currentPage * membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePageChange = (pageNumber) => {
    // 업데이트된 페이지 번호를 기반으로 indexOfFirstMember를 계산
    const newIndexOfFirstMember = (pageNumber - 1) * membersPerPage;
    setCurrentPage(pageNumber);

    // indexOfFirstMember 업데이트
    setIndexOfFirstMember(newIndexOfFirstMember);
  };
  const handleSearch = () => {};

  const handleSanction = () => {};
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
          <div className="AdminMListMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="AdminMListMainIntroSpan">회원 목록 조회</span>
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
              placeholder="ID 또는 이름으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                float: "right",
                width: "150px",
              }} /* 오른쪽 정렬 및 크기 조정 */
              maxLength="15" /* 최대 15글자로 제한 */
            />
          </div>

          <table className="AdminMListSearchTable">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="30%" />
              <col width="30%" />
              <col width="auto" />
            </colgroup>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>

            {currentMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>
                  <button onClick={() => handleSanction(member.id)}>
                    제재
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <div className="AdminMemberListpagination">
            {Array.from({
              length: Math.ceil(filteredMembers.length / membersPerPage),
            }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMemberList;
