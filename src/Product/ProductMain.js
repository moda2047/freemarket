import "./ProductMain.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

import ProductListSearch from "./ProductListSearch";
import ProductRow from "./ProductRow";
import ProductSidebar from "./ProductSidebar";
import ProductCard from "./ProductCard";

function ProductMain( {props} ) {
    const location = useLocation();

    const categoryList = [
        "의류", "신발", "생활용품", 
        "반려동물용품", "한정판", "도서", 
        "핸드폰", "전자제품", "공구",
        "예체능용품", "악세사리", "기타"];

    const [curCategory, setCurCategory] = useState(categoryList[0]);
    const [data, setData] = useState([]);   

    // Data를 카테고리 별로 분리
    const categorizedData = data.reduce((result, item) => {
      const category = item.category;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(item);
      
      return result;
    }, {});
    
    const handleListSearch = () => {
      const ProductlistSearchAPI = "http://localhost:8000/product/searchList";

      axios.get(
        ProductlistSearchAPI,
      {
        params: {
          state:  0,
          keyword: "" 
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
        // 반환 값
        console.log(response);
        // 반환 메시지
        console.log(response.data.message);

        // 데이터 불러와서 설정
        setData(response.data.found);
      } else {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.error("오류", error);
    })  
  };

  useEffect(() => {
    // 전체 데이터 불러오기   
    handleListSearch()
  }, []);

  const handleCategorySearch = (choice) => {
      setCurCategory(choice);
      console.log("Current category : " + choice);
  };

  return (
      <div className="productMain">
          <div className="productMain-sidebar left">
              <ProductSidebar onTabClick={handleCategorySearch}></ProductSidebar>
          </div>
          <div className="productMain-container">
            <div>
                {categoryList.map((category, index) => {
                  const form = {category: category};
                  return(
                    <div className="productMain-productRow-container">
                      <div className="productMain-productRow-category"> 
                          <h3 id={index}>{category}</h3>
                          <Link to="/ProductListSearch"
                              id="productMain-viewMore"
                              state={form}
                              >더보기 &#10095;</Link>
                      </div>
                      
                      <div className="productRow">
                        {categorizedData[category] && categorizedData[category].length >= 4 ? (
                            <>
                            <ProductCard product={categorizedData[category][0]} />
                            <ProductCard product={categorizedData[category][1]} />
                            <ProductCard product={categorizedData[category][2]} />
                            <ProductCard product={categorizedData[category][3]} />
                            </>
                        ) : (
                            <>
                            {categorizedData[category] && categorizedData[category].map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))}
                            </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="productMain-sidebar right">
              
          </div>
      </div>
    );
  }
  
  export default ProductMain;
  