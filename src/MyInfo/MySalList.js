import React, { useState, useEffect } from "react";
import "./MySalList.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MySalList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [totalCount, setTotalCount] = useState();

  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/transaction/searchSaleList`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const data = response.data.found; // found 배열의 첫 번째 요소
        const totalCount = response.data.totalCount;
        setData(data);
        setTotalCount(totalCount);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, [token, setData]);

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
    console.log(currentPage);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="MySalListWrap">
      <div className="MySalListWrapDiv">
        <h3>
          <img src="./image/MySalListImg.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="MySalListMainWrap">
        <div className="MySalListMainIntro">
          <span className="MySalListMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {userid}
          </span>
          님의 판매목록입니다.
        </div>
        <div className="MySalListSearch">
          <table className="MySalListSearchTable">
            <colgroup>
              <col width="20%" />
              <col width="25%" />
              <col width="35%" />
              <col width="auto" />
            </colgroup>
            <tr>
              <th>거래일자</th>
              <th>상품번호</th>
              <th>상품명</th>
              <th>구매자 ID</th>
            </tr>
            {data.length > 0 ? (
              data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.updated_at.slice(0, 10)}</td>
                    <td>{item.product.product_id}</td>
                    <td>{item.product.title}</td>
                    <td>{item.buyer_id}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4">판매 내역이 없습니다.</td>
              </tr>
            )}
          </table>
          <div className="MySalListPagination">
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
    </div>
  );
};

export default MySalList;
