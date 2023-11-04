import "./ProductCreate.css";
import React, { useState } from 'react';


function ProductCreate() {

    const [name, setName] = useState('');
    const [uploadName, setUploadName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setUploadName(file.name);
    };
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        let productData = {
            name: name,
            image: uploadName,
            category: category,
            price: price,
            description: description
        }
 
        console.log(productData);

        setName('');
        setUploadName('');
        setCategory('none');
        setPrice('');
        setDescription('');
    } 

    return (
        <div class="productCreate">
            <div class="productCreate-container">
                <h3> 상품 등록 </h3>
                <table>
                    <tr id="">
                        <td><label>상품명</label></td>
                        <td>
                            <input 
                                type="text" 
                                id="productCreate-name" 
                                value={name}
                                placeholder="상품명을 입력해주세요" 
                                onChange={handleNameChange} />
                        </td>
                    </tr>
                    <tr>
                        <td><label>상품 이미지</label></td>
                        <td>
                            <div className="filebox">
                                <input className="upload-name" 
                                value={uploadName} 
                                placeholder="첨부파일"  
                                />
                                <label htmlFor="productCreate-file">파일 찾기</label>
                                <input type="file" multiple={true} id="productCreate-file" onChange={handleFileUpload} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label>카테고리</label></td>
                        <td>
                            <select id="productCreate-category" 
                                value={category}
                                onChange={handleCategoryChange} >
                                <option value="none" selected>=== 선택 ===</option>
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
                        <td><label>가격</label></td>
                        <td>
                            <input type="number"
                            id="productCreate-price"
                            value={price}
                            onChange={handlePriceChange}
                            />
                            {!price && (
                                <span className="placeholder-text"></span>
                            )}
                        </td>
                    </tr>
                    <tr id="description">
                        <td><label>상품 설명</label></td>
                        <td>
                            <textarea id ="productCreate-description" 
                                value={description}
                                onChange={handleDescriptionChange}>
                            </textarea>
                        </td>
                    </tr>
                </table>

                <div class="bottom">
                    <button href="#" onClick={submit} className="productCreate-register"> 등록하기</button>
                </div>
            </div>
      </div>
    );   
}

export default ProductCreate;