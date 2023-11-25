import React, { useState, useEffect } from "react";
import "./MyInfoSalState.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyInfoSalState = () => {
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
      .get(`http://localhost:8000/product/searchList?sellerId=${userid}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const data = response.data.found; // found 배열의 첫 번째 요소
        const totalCount = response.data.totalCount;
        setData(data);
        setTotalCount(totalCount);
        console.error("데이터 가져오기 성공");
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
    <div className="MyInfoSalStateWrap">
      <div className="MyInfoSalStateWrapDiv">
        <h3>
          <img src="./image/MyInfoSalStateImg.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="MyInfoSalStateMainWrap">
        <div className="MyInfoSalStateMainIntro">
          <span className="MyInfoSalStateMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {userid}
          </span>
          님의 판매중인 목록입니다.
        </div>
        <div className="MyInfoSalStateSearch">
          <table className="MyInfoSalStateSearchTable">
            <colgroup>
              <col width="20%" />
              <col width="25%" />
              <col width="35%" />
              <col width="10%" />
              <col width="auto" />
            </colgroup>
            <tr>
              <th>등록일자</th>
              <th>상품번호</th>
              <th>상품명</th>
              <th>가격</th>
              <th>상세보기</th>
            </tr>
            {data.length > 0 ? (
              data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.updated_at.slice(0, 10)}</td>
                    <td>{item.product_id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <Link
                        className="MyInfoSalStateGoBtn"
                        to={{
                          pathname: "/ProductDetail",
                        }}
                        search={{ productId: item.product_id }}
                      >
                        <img
                          className="MyInfoSalStateGoBtnImg"
                          src="./image/MyInfoSalStateGoBtn.png"
                          alt="nono"
                        ></img>
                      </Link>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">판매 중인 내역이 없습니다.</td>
              </tr>
            )}
          </table>
          <div className="MyInfoSalStatePagination">
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

export default MyInfoSalState;
