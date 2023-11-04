import "./WishList.css";
import Wish from "./Wish";
import { useState, useEffect } from "react";


function WishList( ) {

    const [wishList, setWishList] = useState([]); // 위시리스트 상태

    const handleDeleteWish = (wishId) => {
        // 위시 아이템 삭제 로직
        setWishList(prevList => prevList.filter(wishInfo => wishInfo.id !== wishId));
        console.log('삭제')
    };
  
    useEffect(() => {
        const data = [
            {
                id: 1,
                img: "",
                product: "카메라",
                price: 450000,
            },
            {
                id: 2,
                img: "",
                product: "아이폰",
                price: 300000,
            },
            {
                id: 3,
                img: "",
                product: "상품 3",
                price: 10500,
            },
            {
                id: 4,
                img: "",
                product: "지갑",
                price: 8000,
            },
            {
                id: 5,
                img: "",
                product: "상품 5",
                price: 7000,
            },
            {
                id: 6,
                img: "",
                product: "이불",
                price: 33000,
            },
            {
                id: 7,
                img: "",
                product: "상품 6",
                price: 4000,
            },
            {
                img: "",
                product: "튼튼한 가방",
                price: 23000,
            },
        ];

        setWishList(data);
    }, []);

    const [numToShow, setNumToShow] = useState(3);

    const handleShowMore = () => {
      setNumToShow(prevNum => prevNum + 3);
    };
  
    const visibleWishes = wishList.slice(0, numToShow);

    return (
      <div className="wishList">
        <div className="wishList-header">
          <h3>'사용자' 님의 위시리스트</h3>
        </div>
        <div className="wishList-container">
            {visibleWishes.map((wishInfo, index) => (
                <Wish
                    wishInfo={wishInfo}
                    onDelete={handleDeleteWish}
                />
            ))}
            <div class="wishList-container-more">
                {numToShow < wishList.length && (
                <button onClick={handleShowMore}>더 보기</button>
                )}
            </div>
        </div>
      </div>
    );
  }
  
  export default WishList;