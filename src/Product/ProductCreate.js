import "./ProductCreate.css";
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function ProductCreate() {
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // 유효성 검사용 데이터
  const [nameValid, setNameValid] = useState(false);
  const [fileValid, setFileValid] = useState(false);
  const [thumbnailValid, setThumbnailValid] = useState(false);
  const [categoryValid, setCategoryValid] = useState(false);
  const [priceValid, setPriceValid] = useState(false);
  const [descValid, setDescValid] = useState(false);

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

    if (name === "") {
      setNameValid(false);
      window.alert("상품명을 입력해주세요.");
      return;
    }

    if (imgFile === null) {
      setFileValid(false);
      window.alert("상품 이미지를 업로드해주세요.");
      return;
    }

    if (thumbnailFile === null && thumbnail === "none") {
      setThumbnailFile(false);
      window.alert("썸네일로 사용할 이미지를 선택해주세요.");
      return;
    }

    if (category === "" && category === "none") {
      setCategoryValid(false);
      window.alert("상품 카테고리를 선택해주세요.");
      return;
    }

    if (price === "") {
      setPriceValid(false);
      window.alert("상품 가격을 입력해주세요.");
      return;
    }

    if (description === "") {
      setDescValid(false);
      window.alert("상품 설명을 입력해주세요.");
      return;
    }

    const productCreateAPI = "http://localhost:8000/product/sell";

    const formData = new FormData();

    formData.append("thumbnail", thumbnailFile);
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("img", imgFile[i]);
    }
    formData.append("title", name);
    formData.append("content", description);
    formData.append("price", price);
    formData.append("category", category);

    axios
      .post(productCreateAPI, formData, {
        headers: {
          Authorization: cookies.token,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.error("오류 :", error);
        window.alert("오류");
      });

    // 초기화
    setName("");
    setImgFile(null);
    setFileList([]);
    setThumbnail("");
    setThumbnailFile(null);
    setCategory("");
    setPrice("");
    setDescription("");
  };

  return (
    <div class="productCreate">
      <div class="productCreate-container">
        <h3> 상품 등록 </h3>
        <table className="productCreate">
          <tbody>
            <tr id="">
              <td>
                <label>상품명</label>
              </td>
              <td>
                <input
                  type="text"
                  id="productCreate-name"
                  value={name}
                  placeholder="상품명을 입력해주세요"
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameValid(true);
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
                    placeholder="첨부파일 다중 선택 가능"
                    readOnly
                  />
                  <label htmlFor="productCreate-file">파일 찾기</label>
                  <input
                    type="file"
                    multiple
                    required
                    id="productCreate-file"
                    onChange={(e) => {
                      handleUploadFile(e);
                      setFileValid(true);
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
                    id="productCreate-thumbnail"
                    defaultValue={thumbnail}
                    onChange={(e) => {
                      handleThumbnail(e);
                      setThumbnailValid(true);
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
                  id="productCreate-category"
                  defaultValue={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCategoryValid(true);
                  }}
                >
                  <option value="none">
                    =============== 선택 ===============
                  </option>
                  <option value="clothes">의류</option>
                  <option value="shoes">신발</option>
                  <option value="household_items">생활용품</option>
                  <option value="pet_items">반려동물용품</option>
                  <option value="limited_edition">한정판</option>
                  <option value="book">도서</option>
                  <option value="phone">핸드폰</option>
                  <option value="electronics">전자제품</option>
                  <option value="tools">공구</option>
                  <option value="arts_physical_supplies">예체능용품</option>
                  <option value="accessory">악세사리</option>
                  <option value="etc">기타</option>
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
                  id="productCreate-price"
                  placeholder=""
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceValid(true);
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
                  id="productCreate-description"
                  value={description}
                  placeholder="상품 설명을 입력해주세요"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescValid(true);
                  }}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="bottom">
          <button onClick={submit} className="productCreate-register">
            {" "}
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
