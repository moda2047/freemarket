import "./HeaderDetailSearch.css";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderDetailSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categoryList = [
    "의류",
    "신발",
    "생활용품",
    "반려동물용품",
    "한정판",
    "도서",
    "핸드폰",
    "전자제품",
    "공구",
    "예체능용품",
    "악세사리",
    "기타",
  ];
  const orderList = [
    "가격 낮은순",
    "가격 높은순",
    "최신순",
    "조회수 순",
    "찜수 순",
  ];
  const orderEngList = ["ASCPRICE", "DESCPRICE", "LATEST", "VIEW", "LIKE"];

  const stateList = ["판매중", "예약중", "판매완료"];

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCategoryChange = (index) => {
    setSelectedCategory(index === selectedCategory ? null : index);
  };

  const handleOrderChange = (index) => {
    setSelectedOrder(index === selectedOrder ? null : index);
  };

  const handleStateChange = (index) => {
    setSelectedState(index === selectedState ? null : index);
  };

  const handleDetailSearch = (e) => {
    const form = {
      keyword: keyword,
      category: categoryList[selectedCategory],
      order: orderEngList[selectedOrder],
      state: selectedState,
    };

    navigate("/ProductListSearch?Keyword=" + `${keyword}`, { state: form });
  };

  return (
    <div className="headerDetailSearch">
      <div className="headerDetailSearch-container">
        <button id="btn-toggleMenu" onClick={toggleMenu}>
          상세 검색
          <img src="./image/arrow_down-icon.png"></img>
        </button>
        {isOpen && (
          <div id="toggleMenu">
            <table>
              <tr>
                <td>
                  <a> 기본 검색 </a>
                </td>
                <td>
                  <input
                    id="keyword-box"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <a> 카테고리 </a>
                </td>
                <td>
                  {categoryList.map((category, index) => (
                    <>
                      <input
                        id={`category-checkbox-${index}`}
                        type="checkbox"
                        checked={index === selectedCategory}
                        onChange={() => handleCategoryChange(index)}
                      />
                      <label htmlFor={`category-checkbox-${index}`}>
                        {category}
                      </label>
                    </>
                  ))}
                </td>
              </tr>
              <tr>
                <td>
                  <a> 정렬 옵션 </a>
                </td>
                <td>
                  {orderList.map((order, index) => (
                    <>
                      <input
                        id={`order-checkbox-${index}`}
                        type="checkbox"
                        checked={index === selectedOrder}
                        onChange={() => handleOrderChange(index)}
                      />
                      <label htmlFor={`order-checkbox-${index}`}>{order}</label>
                    </>
                  ))}
                </td>
              </tr>
              <tr>
                <td>
                  <a> 판매 상태 옵션 </a>
                </td>
                <td>
                  {stateList.map((state, index) => (
                    <>
                      <input
                        id={`state-checkbox-${index}`}
                        type="checkbox"
                        checked={index === selectedState}
                        onChange={() => handleStateChange(index)}
                      />
                      <label htmlFor={`state-checkbox-${index}`}>{state}</label>
                    </>
                  ))}
                </td>
              </tr>
              <tr id="btn-search">
                <button onClick={handleDetailSearch}> 검색 </button>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderDetailSearch;
