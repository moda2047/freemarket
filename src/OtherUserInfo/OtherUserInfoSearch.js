import React, { useState, useEffect } from "react";
import "./OtherUserInfoSearch.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OtherUserInfoSearch = (props) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const sellerId = location.search.slice(1);

  console.log(sellerId);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/review/searchWrittenReview?user_id=${sellerId}`
      )
      .then((response) => {
        const data = response.data.found;
        setData(data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/member/search?id=${sellerId}&getSanction=true`
      )
      .then((response) => {
        const userData = response.data.found[0]; // found 배열의 첫 번째 요소
        setUserData(userData);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  useEffect(() => {
    const maxPage = Math.ceil(data.length / itemsPerPage);

    if (currentPage < 1 || currentPage > maxPage) {
      setCurrentPage((prevPage) => Math.min(Math.max(prevPage, 1), maxPage));
    }
  }, [currentPage, data.length, itemsPerPage]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="OtherUserInfoSearchWrap">
      <div className="OtherUserInfoSearchWrapDiv">
        <h3>
          <img src="./image/OtherUserSearchImg.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="OtherUserInfoSearchMainWrap">
        <div className="OtherUserInfoSearchMainIntro">
          <span className="OtherUserInfoSearchMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {sellerId}
          </span>
          님의 정보입니다.
        </div>
        <div className="OtherUserInfoSearchMainContentsWrap">
          <table>
            <colgroup>
              <col width="20%"></col>
              <col width="25%"></col>
              <col width="10%"></col>
              <col width="*%"></col>
            </colgroup>
            <tr>
              <th>작성자 id</th>
              <th>상품명</th>
              <th>별점</th>
              <th>코멘트</th>
            </tr>
            {data.length > 0 ? (
              data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.writer_id}</td>
                    <td>{item.transaction.product.title}</td>
                    <td>{item.rating}</td>
                    <td>{item.content}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4">작성된 리뷰가 없습니다.</td>
              </tr>
            )}
          </table>
          <div className="MyBuyListPagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>{currentPage}</span>
            <button
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <div className="OtherUserInfoSearchMainIntroEmpireInfo">
        <div>
          {userData &&
          userData.target_user_sanctions &&
          userData.target_user_sanctions.length > 0 ? (
            <table className="OtherUserInfoSearchMainIntroEmpireInfoTable">
              {userData.target_user_sanctions.map((sanction, index) => (
                <tr key={index}>
                  <td>
                    <p>
                      <img
                        className="OtherUserSearchCheckImg"
                        src="./image/OtherUserSearchCheckImg.png"
                        alt="nono"
                      ></img>
                      {sellerId}님은
                      {sanction.expire}
                      까지 제재를 당했습니다.
                    </p>
                  </td>
                </tr>
              ))}
            </table>
          ) : userData &&
            userData.target_user_sanctions &&
            userData.target_user_sanctions.length === 0 ? (
            <p>
              <img
                className="OtherUserSearchCheckImg"
                src="./image/OtherUserSearchCheckImg.png"
                alt="nono"
              ></img>
              {sellerId}
              님은 클린한 회원입니다.
            </p>
          ) : (
            "로딩 중..."
          )}
        </div>
      </div>
      <div className="OtherUserInfoSearchBtnWrap">
        <div className="OtherUserInfoSearchBtnGoExit">
          <button>
            {sellerId}와 채팅 하기 &nbsp;
            <img
              className="OtherUserSearchGoChatImg"
              src="./image/OtherUserSearchGoChatImg.png"
              alt="nono"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherUserInfoSearch;
