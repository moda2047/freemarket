import "./ReviewCreate.css";
import StarRate from "./StarRate";
import Carousel from "./Carousel";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function ReviewCreate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [starRate, setStarRate] = useState("");
  const [isChangeable, setIsChangeable] = useState(true);
  const [productImageUrl, setProductImageUrl] = useState([]);
  const productId = location.state.product_id;
  const sellerId = location.state.seller_id;
  const title = location.state.title;
  const transactionId = location.state.transactionId;
  const [cookies] = useCookies(["token", "author", "userid"]);

  const token = cookies.token;
  const author = cookies.author;
  const userid = cookies.userid;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Assuming you have the product_id available, replace this with your actual logic
    console.log(transactionId);

    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/product/searchOne?productId=${productId}`
      )
      .then((response) => {
        if (response) {
          const productDetails = response.data.found;

          // Update the productInfo state

          setProductImageUrl(productDetails.product_Images);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const getStarRate = (num) => {
    setStarRate(num);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      // 데이터 준비
      const reviewData = {
        transaction_id: transactionId,
        rating: parseFloat(starRate), // starRate가 문자열일 경우를 대비하여 숫자로 변환
        content: description,
      };

      // 서버에 POST 요청 보내기
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/review/write",
        reviewData,
        {
          headers: {
            Authorization: `${token}`, // 토큰을 헤더에 추가
          },
        }
      );

      // 응답 확인
      console.log(response.data);
      alert("리뷰 작성을 완료했습니다.");
      navigate("/MyInfoMain");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="reviewCreate">
      <div className="reviewCreate-container">
        <div className="reviewCreate-image">
          {/* Render Carousel with fetched product details */}
          <Carousel img={productImageUrl}></Carousel>
        </div>
        <div className="reviewCreate-info">
          <div className="reviewCreate-product-name">
            <a> {title} </a>
          </div>

          <div className="reviewCreate-reviewer">
            <a> 닉네임 : {sellerId} </a>
          </div>

          <div className="reviewCreate-review">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="reviewCreate-submit">
            <div className="reviewCreate-star-rate">
              {/* Render StarRate with necessary props */}
              <StarRate
                getStarRate={getStarRate}
                starRate={starRate}
                isChangeable={isChangeable}
              ></StarRate>
            </div>
            <button onClick={submit} className="reviewCreate-button">
              리뷰 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCreate;
