import "./Wish.css";
import { Link, Route } from "react-router-dom";

function Wish({ wishInfo, onDelete }) {
  const handleDeleteClick = () => {
    // wish-delete close를 클릭하면 onDelete 콜백 함수 호출
    onDelete(wishInfo.product_id);
    console.log(`클릭한 상품의 id: ${wishInfo.product_id}`);
  };
  return (
    <div class="wish">
      <div class="wish-left">
        <div class="wish-image">
          {/* <img src={wishInfo.img} alt=""></img> */}
        </div>
      </div>

      <div class="wish-middle">
        <div class="wish-product">
          <a> 제목 : {wishInfo.product.title}</a>
        </div>
        <div class="wish-price">
          <a> {wishInfo.product.price} 원 </a>
        </div>
      </div>

      <div class="wish-right">
        <div className="wish-delete close" onClick={handleDeleteClick}></div>
        <div class="wish-chatting">
          <Link to="/ChatMain">
            <button> 채팅하기 </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wish;
