import "./ProductDetail.css";
import react, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Modal from "react-modal";

import Carousel from "./Carousel";
import StarRate from "./StarRate";

function ProductDetail({ props }) {
  const [cookies] = useCookies(["userid", "author", "token"]);
  const token = cookies.token;

  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const productInfo = location.state;
  const id = productInfo.product_id;
  const category = productInfo.category;

  const form = {
    category: category,
  };

  const handleProductDelete = () => {
    const ProductDeleteAPI = "http://localhost:8000/product/remove";

    console.log(token);

    axios
      .delete(ProductDeleteAPI, {
        data: { productId: id },
        headers: {
          Authorization: token,
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data.result) {
          console.log(response.data.message);
          window.alert(response.data.message);

          navigate("/");
        } else {
          console.log(response.data.message);
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("오류", error);
        if (error.response) {
          // 서버에서 응답한 상태 코드와 데이터 확인
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태 코드:", error.response.status);
        }
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
          productId: id,
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
    <div class="productDetail">
      <Modal isOpen={modalIsOpen}>
        <div>해당 상품을 삭제하시겠습니까?</div>
        <div>
          <button
            onClick={() => {
              handleProductDelete();
              setModalIsOpen(false);
            }}
          >
            예
          </button>
          <button
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            아니오
          </button>
        </div>
      </Modal>

      <div className="productDetail-navbar">
        <Link to="/" className="goMain">
          메인
        </Link>
        &nbsp; &gt; &nbsp;
        <Link
          to={"/ProductListSearch?Category=" + `${productInfo.category}`}
          state={form}
        >
          {productInfo.category}
        </Link>
        &nbsp; &gt; &nbsp;
        <a>{}</a>
      </div>

      <br />

      <div class="productDetail-top">
        <div class="productDetail-image">
          <Carousel img={productInfo.product_Images}></Carousel>
        </div>

        <div class="productDetail-info">
          <div class="productDetail-info-top">
            <table>
              <colgroup>
                <col width="80%" />
                <col width="20%" />
              </colgroup>
              <tr>
                <td>
                  {" "}
                  <h1>{productInfo.title}</h1>{" "}
                </td>
                {cookies.author === 1 ||
                cookies.userid === productInfo.seller_id ? (
                  <td>
                    {" "}
                    <Link
                      to={"/ProductUpdate?productId=" + `${id}`}
                      state={productInfo}
                      id="btn-productUpdate"
                    >
                      {" "}
                      상품 수정{" "}
                    </Link>{" "}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
              <tr>
                <td>
                  {" "}
                  <h3>{productInfo.price}원</h3>{" "}
                </td>
                {cookies.author === 1 ||
                cookies.userid === productInfo.seller_id ? (
                  <td>
                    {" "}
                    <button id="btn-productDelete" onClick={setModalIsOpen}>
                      {" "}
                      상품 삭제{" "}
                    </button>{" "}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
              <tr>
                <td className="btn-container">
                  <Link
                    to="/ChatMain"
                    state={{ state: productInfo.seller_id }}
                    id="btn-chatting"
                  >
                    {" "}
                    1:1 채팅{" "}
                  </Link>
                  <button id="btn-addWish" onClick={addWishlist}>
                    {" "}
                    찜 등록{" "}
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <div class="productDetail-info-bottom">
            <table>
              <colgroup></colgroup>
              <tbody>
                <tr>
                  <td>
                    <a id="tag">&nbsp;찜 수&nbsp;</a>
                    <a id="value">{productInfo.like}회</a>
                  </td>
                  <td>
                    <a id="tag">판매자</a>
                    <Link to="/OtherUserInfoSearch" id="value">
                      {productInfo.seller_id}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a id="tag">조회수</a>
                    <a id="value">{productInfo.view}회</a>
                  </td>
                  <td>
                    <a id="tag">별점</a>
                    <a id="value">
                      {productInfo.seller.rating}
                      {/* <StarRate
                                                getStarRate={getStarRate} 
                                                starRate={starRate}                                          
                                                isChangeable={isChangeable}>
                                            </StarRate> */}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a id="tag">작성일</a>
                    <a id="value">{productInfo.updated_at}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="productDetail-bottom">
        <h3> 상품 설명 </h3>
        <a> {productInfo.content} </a>
      </div>
    </div>
  );
}

export default ProductDetail;
