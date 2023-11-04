import "./ProductCard.css";
import { Link, Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function ProductCard({product}) {
    return(
        <div class="productCard">
            <div class="productCard-img">
                <Link to="/">
                    <img src=""></img>
                </Link>
            </div>
            <div class="productCard-name">
                <h4>{product.name}</h4>
            </div>
            <div class="productCard-price">
                <h5> 가격: {product.price} 원</h5>
            </div>
            <div class="productCard-button">
                <Link to="/">1:1 채팅</Link>
                <button>위시리스트</button>
            </div>
        </div>
    );
}

export default ProductCard;