import React, { useState, useEffect } from "react";
import "./MyInfoReviewIw.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyInfoReviewIw = (props) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const navigate = useNavigate();

  const token = cookies.token;
  const userid = cookies.userid;

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/review/searchWriteReview?user_id=${userid}`,
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

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedReviews.indexOf(index);
    console.log(selectedIndex);
    if (selectedIndex === -1) {
      setSelectedReviews([...selectedReviews, index]);
    } else {
      const updatedSelection = [...selectedReviews];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedReviews(updatedSelection);
    }
  };

  const handleDeleteReviews = () => {
    console.log("data", data);
    console.log("selectedReviews", selectedReviews);

    selectedReviews.forEach((index) => {
      console.log("data[index]", data[index]);
      const reviewIdToDelete = data[index]?.review_id;
      console.log("reviewIdToDelete", reviewIdToDelete);

      if (reviewIdToDelete) {
        // Call API to delete the review
        axios
          .delete(process.env.REACT_APP_API_URL + "/review/delete", {
            headers: {
              Authorization: token,
            },
            data: {
              review_id: reviewIdToDelete,
            },
          })
          .then((response) => {
            console.log("리뷰 삭제 성공:", response);
            alert("선택한 리뷰를 삭제했습니다.");
            navigate("/MyInfoMain");
          })
          .catch((error) => {
            console.error("리뷰 삭제 실패:", error);
          });
      }
    });

    // Clear selected reviews after deletion
    setSelectedReviews([]);
  };

  return (
    <div className="MyInfoReviewIwWrap">
      <div className="MyInfoReviewIwWrapDiv">
        <h3>
          <img src="./image/MyInfoReviewIwImg.png" alt="nono"></img>
        </h3>
      </div>
      <hr />
      <div className="MyInfoReviewIwMainWrap">
        <div className="MyInfoReviewIwMainIntro">
          <span className="MyInfoReviewIwMainIntroSpan">
            <img src="./image/MyInfoSearchMainIcon.png" alt="nono"></img>
            {userid}
          </span>
          님이 작성하신 리뷰입니다.
        </div>
        <div className="MyInfoReviewIwMainContentsWrap">
          <table>
            <colgroup>
              <col width="7%"></col>
              <col width="20%"></col>
              <col width="25%"></col>
              <col width="10%"></col>
              <col width="*%"></col>
            </colgroup>
            <tr>
              <th>비고</th>
              <th>id</th>
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
                    <td>
                      <input
                        type="checkbox"
                        id={index}
                        name="MyInfoReviewIwCheckBoxGroup"
                        checked={selectedReviews.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{item.review_id}</td>
                    <td>{item.transaction.product.title}</td>
                    <td>{item.rating}</td>
                    <td>{item.content}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">작성한 리뷰가 없습니다.</td>
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
      <div className="MyInfoReviewIwBtnWrap">
        <div className="MyInfoReviewIwBtnGoDelete">
          <button onClick={handleDeleteReviews}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoReviewIw;
