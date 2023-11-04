import React, { useState, useEffect } from "react";
import "./OtherUserInfoSearch.css";

const OtherUserInfoSearch = (props) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize your dummy data
    const dummyData = [
      {
        id: "feijddy",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },
      {
        id: "feijddy2",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },
      {
        id: "feijddy3",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },
      {
        id: "feijddy3",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },
      {
        id: "feijddy6",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },
      {
        id: "feijddy7",
        productName: "Product 1",
        rating: "1",
        coments: "coments 1",
      },

      // Add more data items as needed
    ];

    setData(dummyData);
  }, []);

  useEffect(() => {
    // Ensure currentPage is within a valid range
    if (currentPage < 1) {
      setCurrentPage(1);
    }
    if (currentPage > Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(data.length / itemsPerPage));
    }
  }, [currentPage, data]);

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
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
          <div className="OtherUserInfoSearchMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="OtherUserInfoSearchMainIntroSpan">이우찬</span>
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
            {data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.rating}</td>
                  <td>{item.coments}</td>
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
              disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <div className="OtherUserInfoSearchBtnWrap">
        <div className="OtherUserInfoSearchBtnGoUpdate">
          <button>리뷰 쓰기</button>
        </div>
        <div className="OtherUserInfoSearchBtnGoExit">
          <button>채팅 하기</button>
        </div>
      </div>
    </div>
  );
};

export default OtherUserInfoSearch;
