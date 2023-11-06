import "./ProductDetail.css";
import react, {useState} from "react";
import { useLocation } from "react-router-dom";

import Carousel from "./Carousel";
import StarRate from "./StarRate";



function ProductDetail({productInfo}) {
    
    const location = useLocation();

    // 별점
    const [isChangeable, setIsChangeable] = useState(false);
    
    const [starRate, setStarRate] = useState('');

    const [wish, setWish] = useState(0);
    const [views, setViews] = useState(0);

    const getStarRate = num => {
        setStarRate(num);
    };

    console.log(location.state);

    return (
        <div class="productDetail">
            <p>카테고리 &gt; {}</p>

            <br/>

            <div class="productDetail-top">
                <div class="productDetail-image">
                    <Carousel img={""}></Carousel>
                </div>

                <div class="productDetail-info">
                    <div class="productDetail-info-top">
                        <table>
                            <colgroup>
                                <col width="80%"/>
                                <col width="20%"/>
                            </colgroup>
                            <tr>
                                <td> <h2>{}</h2> </td>
                                <td> <button> 상품 수정 </button> </td>
                            </tr>
                            <tr>
                                <td> <p>{}</p> </td>
                                <td> <button> 상품 삭제 </button> </td>
                            </tr>
                        </table>  
                    </div>
                    <div class="productDetail-info-bottom">
                        <table>
                            <colgroup>
                                <col width="50%"/>
                                <col width="50%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>
                                        <a id="tag">&nbsp;찜 수&nbsp;</a>
                                        <a id="value">{wish}회</a>
                                    </td>
                                    <td>
                                        <a id="tag">판매자</a>
                                        <a id="value"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a id="tag">조회수</a>
                                        <a id="value">{views}회</a>
                                    </td>
                                    <td>
                                        <a id="tag">별점</a>
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
                            </tbody>
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
