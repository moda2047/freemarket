import React, { useState, useEffect } from "react";
import "./MyInfoReviewYw.css";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyInfoReviewYw = (props) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [totalCount, setTotalCount] = useState();

  const token = cookies.token;
  const userid = cookies.userid;

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/review/searchWrittenReview?user_id=${userid}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.found;
        setData(data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, [token]);

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
    <div className="MyInfoReviewYwWrap">
      <div className="MyInfoReviewYwWrapDiv">
        <h3>
          <img src="./image/MyInfoReviewYwImg.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="MyInfoReviewYwMainWrap">
        <div className="MyInfoReviewYwMainIntro">
          <span className="MyInfoReviewYwMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {userid}
          </span>
          님에 대한 리뷰입니다.
        </div>
        <div className="MyInfoReviewYwMainContentsWrap">
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
                <td colSpan="5">작성된 리뷰가 없습니다.</td>
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
      <div className="MyInfoReviewYwBtnWrap">
        <div className="MyInfoReviewYwBtnGoDelete">
          <button>돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoReviewYw;
