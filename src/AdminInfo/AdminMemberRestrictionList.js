import React, { useState } from "react";
import "./AdminMemberRestrictionList.css";

function AdminMemberRestrictionList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfFirstMember, setIndexOfFirstMember] = useState(0);
  const membersPerPage = 10;

  const mockData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-123-4567",
      sanctionReason: "부적절한 행동",
      sanctionDuration: "30일",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "555-987-6543",
      sanctionReason: "규칙 위반",
      sanctionDuration: "15일",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phoneNumber: "555-567-8901",
      sanctionReason: "욕설 사용",
      sanctionDuration: "10일",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-7890",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "20일",
    },
    {
      id: 5,
      name: "Chris Lee",
      email: "chris.lee@example.com",
      phoneNumber: "555-567-1234",
      sanctionReason: "기타 위반",
      sanctionDuration: "5일",
    },
    {
      id: 6,
      name: "Emily White",
      email: "emily.white@example.com",
      phoneNumber: "555-789-5678",
      sanctionReason: "부적절한 콘텐츠",
      sanctionDuration: "25일",
    },
    {
      id: 7,
      name: "David Kim",
      email: "david.kim@example.com",
      phoneNumber: "555-234-8901",
      sanctionReason: "규칙 위반",
      sanctionDuration: "12일",
    },
    {
      id: 8,
      name: "Grace Brown",
      email: "grace.brown@example.com",
      phoneNumber: "555-789-1234",
      sanctionReason: "욕설 사용",
      sanctionDuration: "8일",
    },
    {
      id: 9,
      name: "Michael Park",
      email: "michael.park@example.com",
      phoneNumber: "555-123-5678",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "18일",
    },
    {
      id: 10,
      name: "Linda Johnson",
      email: "linda.johnson@example.com",
      phoneNumber: "555-567-2345",
      sanctionReason: "부적절한 행동",
      sanctionDuration: "7일",
    },
    {
      id: 11,
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phoneNumber: "555-234-5678",
      sanctionReason: "규칙 위반",
      sanctionDuration: "22일",
    },
    {
      id: 12,
      name: "Sophia Smith",
      email: "sophia.smith@example.com",
      phoneNumber: "555-678-9012",
      sanctionReason: "욕설 사용",
      sanctionDuration: "11일",
    },
    {
      id: 13,
      name: "William Johnson",
      email: "william.johnson@example.com",
      phoneNumber: "555-345-6789",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "16일",
    },
    {
      id: 14,
      name: "Olivia Lee",
      email: "olivia.lee@example.com",
      phoneNumber: "555-901-2345",
      sanctionReason: "부적절한 콘텐츠",
      sanctionDuration: "9일",
    },
    {
      id: 15,
      name: "James Kim",
      email: "james.kim@example.com",
      phoneNumber: "555-123-9012",
      sanctionReason: "규칙 위반",
      sanctionDuration: "14일",
    },
    {
      id: 16,
      name: "Ava Brown",
      email: "ava.brown@example.com",
      phoneNumber: "555-567-1234",
      sanctionReason: "욕설 사용",
      sanctionDuration: "7일",
    },
    {
      id: 17,
      name: "Ethan Smith",
      email: "ethan.smith@example.com",
      phoneNumber: "555-901-5678",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "20일",
    },
    {
      id: 18,
      name: "Mia Johnson",
      email: "mia.johnson@example.com",
      phoneNumber: "555-234-5678",
      sanctionReason: "부적절한 행동",
      sanctionDuration: "6일",
    },
    {
      id: 19,
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      phoneNumber: "555-567-9012",
      sanctionReason: "규칙 위반",
      sanctionDuration: "28일",
    },
    {
      id: 20,
      name: "Isabella Smith",
      email: "isabella.smith@example.com",
      phoneNumber: "555-234-9012",
      sanctionReason: "욕설 사용",
      sanctionDuration: "13일",
    },
    {
      id: 21,
      name: "Alexander Brown",
      email: "alexander.brown@example.com",
      phoneNumber: "555-567-1234",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "17일",
    },
    {
      id: 22,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      phoneNumber: "555-901-2345",
      sanctionReason: "부적절한 콘텐츠",
      sanctionDuration: "10일",
    },
    {
      id: 23,
      name: "Noah Kim",
      email: "noah.kim@example.com",
      phoneNumber: "555-234-5678",
      sanctionReason: "규칙 위반",
      sanctionDuration: "21일",
    },
    {
      id: 24,
      name: "Olivia Lee",
      email: "olivia.lee@example.com",
      phoneNumber: "555-901-1234",
      sanctionReason: "욕설 사용",
      sanctionDuration: "9일",
    },
    {
      id: 25,
      name: "Liam Smith",
      email: "liam.smith@example.com",
      phoneNumber: "555-123-5678",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "19일",
    },
    {
      id: 26,
      name: "Charlotte Johnson",
      email: "charlotte.johnson@example.com",
      phoneNumber: "555-567-2345",
      sanctionReason: "부적절한 행동",
      sanctionDuration: "8일",
    },
    {
      id: 27,
      name: "William Wilson",
      email: "william.wilson@example.com",
      phoneNumber: "555-901-5678",
      sanctionReason: "규칙 위반",
      sanctionDuration: "25일",
    },
    {
      id: 28,
      name: "Ava Brown",
      email: "ava.brown@example.com",
      phoneNumber: "555-234-5678",
      sanctionReason: "욕설 사용",
      sanctionDuration: "11일",
    },
    {
      id: 29,
      name: "Michael Kim",
      email: "michael.kim@example.com",
      phoneNumber: "555-567-9012",
      sanctionReason: "스팸 홍보",
      sanctionDuration: "14일",
    },
    {
      id: 30,
      name: "Mia Smith",
      email: "mia.smith@example.com",
      phoneNumber: "555-234-9012",
      sanctionReason: "부적절한 콘텐츠",
      sanctionDuration: "12일",
    },
    {
      id: 31,
      name: "James Johnson",
      email: "james.johnson@example.com",
      phoneNumber: "555-901-1234",
      sanctionReason: "규칙 위반",
      sanctionDuration: "16일",
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
    <div className="AdminMRListWrap">
      <div className="AdminMRListWrapDiv">
        <h3>
          <img src="./image/AdminMemberRestrictionList.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="AdminMRListMainWrap">
        <div className="AdminMRListMainIntro">
          <div className="AdminMRListMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="AdminMRListMainIntroSpan">
            제재 당한 회원 목록 조회
          </span>
        </div>
        <div>
          <div className="AdminMRListSearchButton">
            <button className="AdminMRListSearchCheck" onClick={handleSearch}>
              검색
            </button>
            <input
              className="AdminMRListSearchInput"
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

          <table className="AdminMRListSearchTable">
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
              <th>제재 사유</th>
              <th>제재 기간</th>
            </tr>

            {currentMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>
                  {member.sanctionReason} {/* 제재 사유 표시 */}
                </td>
                <td>
                  {member.sanctionDuration} {/* 제재 기간 표시 */}
                </td>
              </tr>
            ))}
          </table>
          <div className="AdminMRListpagination">
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

export default AdminMemberRestrictionList;
