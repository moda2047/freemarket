import "./Wish.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Wish({ wishInfo, onDelete }) {
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    // wish-delete close를 클릭하면 onDelete 콜백 함수 호출
    onDelete(wishInfo.product_id);
    console.log(`클릭한 상품의 id: ${wishInfo.product_id}`);
  };

  const navigateProductDetail = (product_id) => {
    const ProductDetailSearchAPI =
      process.env.REACT_APP_API_URL + "/product/searchOne";

    axios
      .get(
        ProductDetailSearchAPI,
        {
          params: {
            productId: product_id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          console.log(response);
          console.log(response.data.message);

          navigate("/ProductDetail", { state: response.data.found });
        } else {
          console.log(response);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("오류", error);
      });
  };
  return (
    <div class="wish">
      <div class="wish-left">
        <div class="wish-image">
          <Link
            className="wish-image"
            onClick={() => navigateProductDetail(wishInfo.product_id)}
          >
            <img
              src={wishInfo.product.product_Images[0].image_url}
              alt="nono"
            ></img>
          </Link>
        </div>
      </div>

      <div class="wish-middle">
        <div class="wish-product">
          <Link
            className="MyBuyListReviewLink"
            onClick={() => navigateProductDetail(wishInfo.product_id)}
          >
            {" "}
            제목 : {wishInfo.product.title}
          </Link>
        </div>
        <div class="wish-price">
          <a> {wishInfo.product.price} 원 </a>
        </div>
      </div>

      <div class="wish-right">
        <div className="wish-delete close" onClick={handleDeleteClick}></div>
      </div>
    </div>
  );
}

export default Wish;
