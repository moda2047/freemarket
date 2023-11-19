import "./ProductUpdate.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ProductUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const productInfo = location.state;
  const [cookies] = useCookies(["token"]);

  const [title, setTitle] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState(productInfo.category);
  const [price, setPrice] = useState(null);
  const [content, setContent] = useState(null);

  const handleUploadFile = async (e) => {
    setImgFile(e.target.files);

    const list = [];
    for (let i = 0; i < e.target.files.length; i++) {
      list.push(e.target.files[i].name);
    }

    setFileList(list);
  };

  const handleThumbnail = (e) => {
    setThumbnail(e.target.value);

    console.log(imgFile);

    for (let i = 0; i < imgFile.length; i++) {
      const file = imgFile[i];
      if (file.name === thumbnail) {
        setThumbnailFile(file);
        console.log(thumbnailFile);
      }
    }
  };

  // FORM 데이터로 전송해야 함
  // url 데이터로 전송

  const submit = (e) => {
    e.preventDefault();

    const ProductUpdateAPI = "http://localhost:8000/product/change";

    const formData = new FormData();

    formData.append("productId", productInfo.product_id);
    console.log(productInfo.product_id);

    // 입력 여부 확인
    if (title !== null) {
      formData.append("title", title);
    }
    if (content !== null) {
      formData.append("content", content);
    }
    if (price !== null) {
      formData.append("price", price);
    }
    if (category !== null || category !== productInfo.category) {
      formData.append("category", category);
    }
    if (thumbnailFile !== null) {
      formData.append("thumbnail", thumbnailFile);
    }
    if (imgFile !== null) {
      for (let i = 0; i < imgFile.length; i++) {
        formData.append("img", imgFile[i]);
      }
    }

    axios
      .patch(ProductUpdateAPI, formData, {
        headers: {
          Authorization: cookies.token,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data.result) {
          window.alert(response.data.message);
          navigate("/");
        } else {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("오류 :", error);
        window.alert("오류");
      });
  };

  return (
    <div class="productUpdate">
      <div class="productUpdate-container">
        <h2> 상품 수정 </h2>
        <div className="productUpdate-container-info">
          <h3 style={{ textAlign: "center" }}>
            {" "}
            수정하실 내용만 입력해주세요.{" "}
          </h3>
        </div>
        <table id="productUpdate">
          <tbody>
            <tr id="">
              <td>
                <label>상품명</label>
              </td>
              <td>
                <input
                  type="text"
                  id="productUpdate-name"
                  value={title}
                  placeholder={productInfo.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>상품 이미지</label>
              </td>
              <td>
                <div className="filebox">
                  <input
                    className="file-list"
                    value={fileList}
                    placeholder=""
                    readOnly
                  />
                  <label htmlFor="productUpdate-file">파일 찾기</label>
                  <input
                    type="file"
                    multiple
                    required
                    id="productUpdate-file"
                    onChange={(e) => {
                      handleUploadFile(e);
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label>썸네일 이미지</label>
              </td>
              <td>
                <div>
                  <select
                    id="productUpdate-thumbnail"
                    value={thumbnail}
                    placeholder={productInfo.thumbnail}
                    onChange={(e) => {
                      handleThumbnail(e);
                    }}
                  >
                    <option value="none">
                      {" "}
                      이미지를 등록하고 썸네일을 선택해주세요{" "}
                    </option>
                    {fileList.length !== 0
                      ? fileList.map((fileName) => (
                          <option key={fileName} value={fileName}>
                            {fileName}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label>카테고리</label>
              </td>
              <td>
                <select
                  id="productUpdate-category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="none">
                    =============== 선택 ===============
                  </option>
                  <option value="의류">의류</option>
                  <option value="신발">신발</option>
                  <option value="생활용품">생활용품</option>
                  <option value="반려동물용품">반려동물용품</option>
                  <option value="한정판">한정판</option>
                  <option value="도서">도서</option>
                  <option value="핸드폰">핸드폰</option>
                  <option value="전자제품">전자제품</option>
                  <option value="공구">공구</option>
                  <option value="예체능용품">예체능용품</option>
                  <option value="악세사리">악세사리</option>
                  <option value="기타">기타</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>가격</label>
              </td>
              <td>
                <input
                  type="number"
                  id="productUpdate-price"
                  placeholder={productInfo.price}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                {!price && <span className="placeholder-text"></span>}
              </td>
            </tr>
            <tr id="description">
              <td>
                <label>상품 설명</label>
              </td>
              <td>
                <textarea
                  id="productUpdate-description"
                  value={content}
                  placeholder={productInfo.content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="bottom">
          <button onClick={submit} className="productUpdate-register">
            {" "}
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
