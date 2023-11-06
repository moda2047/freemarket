import "./ProductCard.css";
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function ProductCard( {product} ) {
    return(
        <div class="productCard">
            <div class="productCard-img">
                <Link to={{
                    pathname: "/ProductDetail",
                    state: {
                        product: product                        
                    }
                }}>
                    <img src={product.img}></img>
                </Link>
            </div>
            <div class="productCard-name">
                <Link to={{
                    pathname: "/ProductDetail",
                    state: {
                        product: product
                    }   
                }}>
                    <h4>{product.name}</h4>
                </Link>
                
            </div>
            <div class="productCard-price">
                <h5> 가격: {product.price} 원</h5>
            </div>
            <div class="productCard-button">
                <Link to="/chatting">1:1 채팅</Link>
                <button>위시리스트</button>
            </div>
        </div>
    );
}

export default ProductCard;