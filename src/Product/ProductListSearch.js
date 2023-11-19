import "./ProductListSearch.css";
import ProductSidebar from "./ProductSidebar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";

function ProductListSearch({ productList }) {
    const location = useLocation();
    const state = location.state;
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        console.log(state);

        if(state !== null) {  
            handleListSearch(state)
        }
    }, [state]);

    const handleListSearch = (state) => {
        const ProductlistSearchAPI = "http://localhost:8000/product/searchList";

        axios.get(
          ProductlistSearchAPI,
        {
          params: state
        },        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        
        if (response.data.result) {
          // 반환 값
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
  

    // productList를 4개씩 묶어서 그룹화
    const groupedProductList = [];

    if(data !== undefined) {
        for (let i = 0; i < data.length; i += 4) {
            groupedProductList.push(data.slice(i, i + 4));
        }
    }

    return (
        <div className="productListSearch">
            <div className="productListSearch-sidebar left">
                <ProductSidebar></ProductSidebar>
            </div>
            <div className="productListSearch-container">
                <div className="productListSearch-container-header">
                    <a id="pageInfo"> 
                        <span style={{color:"#2d51c5", fontWeight:"bold"}}>
                        </span> 검색결과 페이지 
                    </a>
                    <Link
                        to="/"
                        id="goMainPage"
                        >
                        &nbsp; 메인으로
                    </Link>
                </div>
                <div>  
                {groupedProductList.map((group, index) => (
                    <div className="productRow" key={index}>
                        {group.map((product, productIndex) => (
                            <ProductCard product={product} key={productIndex} />
                        ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default ProductListSearch;