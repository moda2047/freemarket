import "./ProductMain.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import ProductListSearch from "./ProductListSearch";
import ProductRow from "./ProductRow";
import ProductSidebar from "./ProductSidebar";
import ProductCard from "./ProductCard";

function ProductMain() {
    
    const categoryList = [
        "의류", "신발", "생활용품", 
        "반려동물용품", "한정판", "도서", 
        "핸드폰", "전자제품", "공구",
        "예체능용품", "악세사리", "기타"];

    const [mainPage, setMainPage] = useState(true);
    const [curCategory, setCurCategory] = useState("의류");
    const [data, setData] = useState([]);   
    // DummyData
    useEffect(() => {
        const dummyData = [
            {
                category: "의류",
                img: '',
                name: '후드 티',
                price: 38000
            },
            {
                category: "의류",
                img: '',
                name: '반바지',
                price: 22000
            },
            {
                category: "의류",
                img: '',
                name: '청바지',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '와이셔츠',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '원피스',
                price: 36000
            },
            {
                category: "의류",
                img: '',
                name: '치마',
                price: 30000
            },
            {
                category: "의류",
                img: '',
                name: '후드 티',
                price: 38000
            },
            {
                category: "의류",
                img: '',
                name: '반바지',
                price: 22000
            },
            {
                category: "의류",
                img: '',
                name: '청바지',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '와이셔츠',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '원피스',
                price: 36000
            },
            {
                category: "의류",
                img: '',
                name: '후드 티',
                price: 38000
            },
            {
                category: "의류",
                img: '',
                name: '반바지',
                price: 22000
            },
            {
                category: "의류",
                img: '',
                name: '청바지',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '와이셔츠',
                price: 40000
            },            
            {
                category: "의류",
                img: '',
                name: '원피스',
                price: 36000
            },
            {
                category: "신발",
                name: '구두',
                price: 70000
            },
            {
                category: "신발",
                name: '캔버스',
                price: 32000
            },
            {
                category: "신발",
                name: '슬리퍼',
                price: 4000
            },
            {
                category: "생활용품",
                name: '빗자루',
                price: 4000
            },
            {
                category: "생활용품",
                name: '쓰레받기',
                price: 4000
            },
            {
                category: "반려동물용품",
                name: '캣타워',
                price: 130000
            },
            {
                category: "한정판",
                name: '금오공대 마스코트 인형',
                price: 5000
            },
            {
                category: "도서",
                name: 'A book',
                price: 15000
            },
            {
                category: "도서",
                name: 'B note',
                price: 2000
            },
            {
                category: "핸드폰",
                name: '아이폰 XS',
                price: 320000
            },
            {
                category: "전자제품",
                name: '무선청소기',
                price: 180000
            },
            {
                category: "공구",
                name: '십자드라이버',
                price: 3000
            },
            {
                category: "예체능용품",
                name: '농구공',
                price: 50000
            },
            {
                category: "악세사리",
                name: '반지',
                price: 5000
            },
            {
                category: "기타",
                name: 'A4 용지 묶음',
                price: 20000
            },
        ];
        
        setData(dummyData);
    }, []);

    // Data를 카테고리 별로 분리
    const categorizedData = data.reduce((result, item) => {
        const category = item.category;
        if (!result[category]) {
          result[category] = [];
        }
        result[category].push(item);
        return result;
    }, {});

    const handleListSearch = (choice) => {
        setCurCategory(choice);
        setMainPage(false);

        console.log("Current category : " + choice);
    };

    const handleRefresh = () => {
        setMainPage(true);
    };

    return (
        <div className="productMain">
            <div className="productMain-sidebar left">
                <ProductSidebar onTabClick={handleListSearch}></ProductSidebar>
            </div>
            <div className="productMain-container">
                {mainPage === true && (
                    <div>
                        {categoryList.map((category, index) => (
                            <div className="productMain-productRow-container">
                                <div className="productMain-productRow-category"> 
                                    <h3>{category}</h3>
                                    <a 
                                        id="productMain-viewMore"
                                        onClick={() => {
                                            handleListSearch(category);
                                        }}>더보기&#10095;</a>
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
                                {/* <ProductRow productList={categorizedData[category].slice(0, 4)} key={index} /> */}
                            </div>
                        ))}
                    </div>
                    )
                }
                {mainPage === false && 
                    <ProductListSearch 
                        productList={categorizedData[curCategory]} 
                        curCategory={curCategory}
                        handleRefresh={handleRefresh}
                    />}
            </div>
            <div className="productMain-sidebar right">
                
            </div>
        </div>
    );
  }
  
  export default ProductMain;
  