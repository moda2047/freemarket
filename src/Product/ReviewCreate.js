import "./ReviewCreate.css";
import StarRate from "./StarRate";
import Carousel from "./Carousel";
import React, { useState } from 'react';

function ReviewCreate(productInfo) {

    productInfo = {
        name: "레몬",
        seller: "사과농장"
    };

    const [description, setDescription] = useState('');
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const [starRate, setStarRate] = useState('');
    
    const getStarRate = num => {
        setStarRate(num);
    };

    const isChangeable = true;

    const submit = (e) => {
        e.preventDefault();

        let productData = {
            starRate: starRate,
            description: description
        }
 
        console.log(productData);

        setDescription('');
    } 

    return (
        <div class="reviewCreate">
            <div class="reviewCreate-container">
                <div class="reviewCreate-image">
                    <Carousel></Carousel>
                </div>
                <div class="reviewCreate-info">
                    <div class="reviewCreate-product-name">
                        <a> {productInfo.name} </a>
                    </div>
                    
                    <div class="reviewCreate-reviewer">
                        <a> 닉네임 : {productInfo.seller} </a>
                    </div>

                    <div class="reviewCreate-review">
                        <textarea 
                            value={description}
                            onChange={handleDescriptionChange}>
                        </textarea>
                    </div>

                    <div class="reviewCreate-submit">
                        <div class="reviewCreate-star-rate">
                            <StarRate 
                                getStarRate={getStarRate} 
                                starRate={starRate} 
                                isChangeable={isChangeable}>
                            </StarRate>
                        </div>
                        <button onClick={submit} class="reviewCreate-button">리뷰 등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCreate;
