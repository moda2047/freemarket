import "./WishList.css";
import Wish from "./Wish";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function WishList() {
  const [wishList, setWishList] = useState([]); // 위시리스트 상태
  const [cookies] = useCookies(["token", "author", "userid"]);
  const [totalCount, setTotalCount] = useState();

  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;

  useEffect(() => {
    // API 호출
    axios
      .get("http://localhost:8000/wishList/search", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const dataFromApi = response.data.found;
        const totalCount = response.data.totalCount;

        setWishList(dataFromApi);
        setTotalCount(totalCount);
      })
      .catch((error) => {
        console.error("위시리스트 데이터 가져오기 실패:", error);
      });
  }, []);

  const [numToShow, setNumToShow] = useState(3);

  const handleShowMore = () => {
    setNumToShow((prevNum) => prevNum + 3);
  };

  const handleDeleteWish = (wishId) => {
    // 확인 창 띄우기
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    // 사용자가 확인을 눌렀을 경우에만 삭제 수행
    if (shouldDelete) {
      // API 호출하여 위시 삭제 등의 동작 수행
      axios
        .delete(`http://localhost:8000/wishList/delete`, {
          headers: {
            Authorization: token,
          },
          data: {
            productId: wishId,
          },
        })
        .then((response) => {
          console.log("위시 삭제 성공:", response);
          // 삭제 성공 시 상태에서도 해당 위시 삭제
          alert("삭제되었습니다.");
          setWishList((prevList) =>
            prevList.filter((wishInfo) => wishInfo.product_id !== wishId)
          );
        })
        .catch((error) => {
          console.error("위시 삭제 실패:", error);
        });
    }
  };

  return (
    <div className="wishList">
      <div className="wishList-header">
        <h3>{userid} 님의 위시리스트</h3>
      </div>
      <div className="wishList-container">
        {wishList.slice(0, numToShow).map((wishInfo, index) => (
          <Wish
            key={wishInfo.product_id}
            wishInfo={wishInfo}
            onDelete={() => handleDeleteWish(wishInfo.product_id)}
          />
        ))}
        <div className="wishList-container-more">
          {numToShow < wishList.length && (
            <button onClick={handleShowMore}>더 보기</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishList;
