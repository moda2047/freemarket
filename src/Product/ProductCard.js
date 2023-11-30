import "./ProductCard.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function ProductCard({ product }) {
  const [cookies] = useCookies(["userid", "token"]);

  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({});

  const [productId, setProductId] = useState(product.product_id);
  const [sellerId, setsellerId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [view, setView] = useState(0);
  const [like, setLike] = useState(0);
  const [status, setStatus] = useState(0);
  const [updatedTime, setUpdatedTime] = useState("");
  const [image, setImage] = useState([]);
  const [rating, setRating] = useState(0);

  const viewProductDetail = () => {
    const ProductDetailSearchAPI = "http://localhost:8000/product/searchOne";

    axios
      .get(
        ProductDetailSearchAPI,
        {
          params: {
            productId: productId,
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

          setProductInfo(response.data.found);

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

  const addWishlist = (e) => {
    e.preventDefault();

    if (cookies.userid === undefined || cookies.token === undefined) {
      window.alert("로그인 이후 가능한 기능입니다. \n로그인을 진행해주세요.");
      navigate("/login");
      return;
    }

    const AddWishlistAPI = "http://localhost:8000/wishList/add";

    axios
      .post(
        AddWishlistAPI,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: cookies.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data.result) {
          console.log(response.data.message);
          window.alert(response.data.message);

          window.location.reload("/");
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        window.alert(error);
      });
  };

  return (
    <div className="productCard">
      <div className="productCard-img">
        <a onClick={viewProductDetail}>
          <img src={product.product_Images[0].image_url}></img>
        </a>
      </div>
      <div className="productCard-name">
        <a onClick={viewProductDetail}>
          <h4>{product.title}</h4>
        </a>
      </div>
      <div className="productCard-price">
        <h5> {product.price}원</h5>
      </div>
      <div className="productCard-info">
        <h5>
          <img src="./image/view-icon.png" /> {product.view}
        </h5>
        <h5>
          <img src="./image/wish-icon.png" /> {product.like}
        </h5>
      </div>
      <div className="productCard-button">
        <Link to="/chatting" id="btn-chatting">
          1:1 채팅
        </Link>
        <button id="btn-addWish" onClick={addWishlist}>
          찜 등록
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
