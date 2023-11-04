import "./ProductSidebar.css";
import { Link } from "react-router-dom";

function ProductSidebar() {
    return (
        <div class="productSidebar sidebar">
            <ul>
                <br></br>
                <h3> 카테고리 </h3>
                <li>
                    <Link to="/">의류</Link>
                </li>
                <li>
                    <Link to="/">신발</Link>
                </li>
                <li>
                    <Link to="/">생활용품</Link>
                </li>
                <li>
                    <Link to="/">반려동물용품</Link>
                </li>
                <li> 
                    <Link to="/">한정판</Link>  
                </li>
                <li>
                    <Link to="/">도서</Link>
                </li>
                <li>
                    <Link to="/">핸드폰</Link>
                </li>
                <li>
                    <Link to="/">전자제품</Link>
                </li>
                <li>
                    <Link to="/">공구</Link>
                </li>
                <li>
                    <Link to="/">예체능용품</Link>
                </li>
                <li>
                    <Link to="/">악세사리</Link>
                </li>
                <li>
                    <Link to="/">기타</Link>
                </li>
            </ul>
        </div>
    );
  }
  
  export default ProductSidebar;
  