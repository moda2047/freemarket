import "./ProductSidebar.css";
import { useNavigate } from "react-router-dom";

function ProductSidebar({ onTabClick }) {

    const navigate = useNavigate();

    return (
        <div class="productSidebar">
            <ul>
                <br></br>
                <h3> 카테고리 </h3>
                <li>
                    <a onClick={() => {
                        onTabClick("의류");
                    }}>의류</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("신발");
                    }}>신발</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("생활용품");
                    }}>생활용품</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("반려동물용품");
                    }}>반려동물용품</a>
                </li>
                <li> 
                    <a onClick={() => {
                        onTabClick("한정판");
                    }}>한정판</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("도서");
                    }}>도서</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("핸드폰");
                    }}>핸드폰</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("전자제품");
                    }}>전자제품</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("공구");
                    }}>공구</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("예체능용품");
                    }}>예체능용품</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("악세사리");
                    }}>악세사리</a>
                </li>
                <li>
                    <a onClick={() => {
                        onTabClick("기타");
                    }}>기타</a>
                </li>
            </ul>
        </div>
    );
  }
  
  export default ProductSidebar;
  