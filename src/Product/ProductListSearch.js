import "./ProductListSearch.css";
import ProductSidebar from "./ProductSidebar";
import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductListSearch({ productList, curCategory, handleRefresh }) {
    // productList를 4개씩 묶어서 그룹화합니다.
    const groupedProductList = [];
    for (let i = 0; i < productList.length; i += 4) {
        groupedProductList.push(productList.slice(i, i + 4));
    }

    return (
        <div className="productListSearch">
            <div className="productListSearch-container">
                <div className="productListSearch-container-header">
                    <a id="pageInfo"> 
                        <span style={{color:"#2d51c5", fontWeight:"bold"}}>
                            {curCategory}
                        </span> 의 검색결과 페이지입니다.  
                    </a>
                    <span
                        id="goMainPage"
                        onClick={handleRefresh} 
                        >
                        &nbsp; 메인으로
                    </span>
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