import React, { useState, useEffect } from "react";
import "./MySalList.css";

const MySalList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize your dummy data
    const dummyData = [
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 2",
      },
      {
        date: "2023-10-16",
        productNumber: "001",
        productName: "Product 1",
        sellerId: "Seller 1",
      },
      {
        date: "2023-10-15",
        productNumber: "002",
        productName: "Product 2",
        sellerId: "Seller 100",
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
    <div className="MySalListWrap">
      <div className="MySalListWrapDiv">
        <h3>
          <img src="./image/MySalListImg.png" alt="nono" />
        </h3>
      </div>
      <hr />
      <div className="MyBuyListMainWrap">
        <div className="MyBuyListMainIntro">
          <div className="MyBuyListMainIntroImgDiv">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
          </div>
          <span className="MyBuyListMainIntroSpan">이우찬</span>
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
            {data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.productNumber}</td>
                  <td>{item.productName}</td>
                  <td>{item.sellerId}</td>
                </tr>
              ))}
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
