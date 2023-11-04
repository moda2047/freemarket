import { useState, useEffect } from "react";
import ProductListSearch from "./ProductListSearch";
import "./ProductMain.css";
import ProductRow from "./ProductRow";
import ProductSidebar from "./ProductSidebar";

function ProductMain() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const productLists = [
            [
                {
                    category: "의류",
                    name: '후드 티',
                    price: 38000
                },
                {
                    category: "의류",
                    name: '반바지',
                    price: 22000
                },
                {
                    category: "의류",
                    name: '청바지',
                    price: 40000
                },            
                {
                    category: "의류",
                    name: '와이셔츠',
                    price: 40000
                },            
                {
                    category: "의류",
                    name: '원피스',
                    price: 36000
                },
                {
                    category: "의류",
                    name: '치마',
                    price: 30000
                },
            ],
            [
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
            ],
            [
                {
                    category: "도서",
                    name: 'A book',
                    price: 15000
                },
                {
                    category: "도서",
                    name: 'B note',
                    price: 2000
                }
            ],
            [
                {
                    category: "한정판",
                    name: '금오공대 마스코트 인형',
                    price: 5000
                }
            ]
        ];
        
        setData(productLists);
    }, []);


    return (
        <div class="productMain">
            <div class="productMain-sidebar left">
                <ProductSidebar></ProductSidebar>
            </div>
            <div class="productMain-container">
                <ProductListSearch productLists={data} />
            </div>
            <div class="productMain-empty right">
                
            </div>
        </div>
    );
  }
  
  export default ProductMain;
  