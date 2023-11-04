import "./ProductDetail.css";
import react, {useState} from "react";
import Carousel from "./Carousel";
import StarRate from "./StarRate";

function ProductDetail(productInfo) {
    
    const [starRate, setStarRate] = useState('');
    
    const getStarRate = num => {
        setStarRate(num);
    };

    const isChangeable = false;

    return (
        <div class="productDetail">
            <p>카테고리 &gt; </p>

            <br/>

            <div class="productDetail-top">
                <div class="productDetail-image">
                    <Carousel></Carousel>
                </div>

                <div class="productDetail-info">
                    <div class="productDetail-info-top">
                        <table>
                            <tr>
                                <td> <h2>상품명</h2> </td>
                                <td> <button> 상품 수정 </button> </td>
                            </tr>
                            <tr>
                                <td> <p>가격</p> </td>
                                <td> <button> 상품 삭제 </button> </td>
                            </tr>
                        </table>  
                    </div>
                    <div class="productDetail-info-bottom">
                        <table>
                            <tr>
                                <td>
                                    <a id="tag">&nbsp;찜 수&nbsp;</a>
                                    <a id="value">회</a>
                                </td>
                                <td>
                                    <a id="tag">판매자</a>
                                    <a id="value"> </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a id="tag">조회수</a>
                                    <a id="value">회</a>
                                </td>
                                <td>
                                    <a id="tag">판매자 평점</a>
                                    <a id="value">
                                        <StarRate
                                            getStarRate={getStarRate} 
                                            starRate={starRate}                                          
                                            isChangeable={isChangeable}>
                                        </StarRate>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a id="tag">작성일</a>
                                    <a id="value"></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="productDetail-bottom">
                <h3> 상품 설명 </h3>
                <a> 'description' </a>
            </div>


        </div>
    );    
}

export default ProductDetail;
