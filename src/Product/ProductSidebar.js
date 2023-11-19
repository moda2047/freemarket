import "./ProductSidebar.css";
import { useNavigate, Link } from "react-router-dom";

function ProductSidebar({  }) {
    const categoryList = [
        "의류", "신발", "생활용품", 
        "반려동물용품", "한정판", "도서", 
        "핸드폰", "전자제품", "공구",
        "예체능용품", "악세사리", "기타"];

    return (
        <div className="productSidebar">
            <ul>
                <br></br>
                <h3> 카테고리 </h3>
                {categoryList.map((category, index) => {
                    const  form = {
                        category: category
                    };
                    return (
                        <li>
                            <Link to="/ProductListSearch" state={form}>{category}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
  }
  
  export default ProductSidebar;
  