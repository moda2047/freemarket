import "./Wish.css";
import { Link, Route } from "react-router-dom";

function Wish({ wishInfo, onDelete }) {
  const handleDelete = () => {
    onDelete(wishInfo.id);
  };

  return (
    <div class="wish">
      <div class="wish-left">
        <div class="wish-image">
          <img src={wishInfo.img} alt=""></img>
        </div>
      </div>

      <div class="wish-middle">
        <div class="wish-product">
          <a> 제목 : {wishInfo.product}</a>
        </div>
        <div class="wish-price">
          <a> {wishInfo.price} 원 </a>
        </div>
      </div>

      <div class="wish-right">
        <div class="wish-delete close" onClick={handleDelete}></div>
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
