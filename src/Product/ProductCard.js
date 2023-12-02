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
    const ProductDetailSearchAPI =
      process.env.REACT_APP_API_URL + "/product/searchOne";

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

    const AddWishlistAPI = process.env.REACT_APP_API_URL + "/wishList/add";

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
  const handleChat = () => {
    const data = {
      productId: productId,
    };
    const url = process.env.REACT_APP_API_URL + "/chat/enterChatRoom";
    const headers = {
      headers: {
        Authorization: cookies.token,
        ContentType: "application/json",
        Accept: "application/json",
      },
    };

    axios
      .post(url, data, headers)

      .then((response) => {
        console.log(response);
        if (response.data.result) {
          console.log(response.data);
          navigate("/ChatMain", { state: { chatData: response.data } });
          console.log(response.data.message);
        } else {
          window.alert("본인과 채팅은 하실 수 없습니다.");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        window.alert("채팅방 생성 중 오류.");
        console.error("채팅방 생성 중 오류", error);
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
        <button id="btn-chatting" onClick={handleChat}>
          1:1 채팅
        </button>
        <button id="btn-addWish" onClick={addWishlist}>
          찜 등록
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
