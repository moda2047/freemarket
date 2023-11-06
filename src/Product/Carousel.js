import './Carousel.css';
import React, { useEffect, useState } from 'react';

function Carousel(props) {

    const [slideIndex, setSlideIndex] = useState(1);

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);

    const plusSlides = (n) => {
        setSlideIndex(slideIndex + n);
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    const showSlides = (n) => {
        let i;
        let slides = document.getElementsByClassName('mySlides');
        let dots = document.getElementsByClassName('dot');
        
        if (n > slides.length) {
            setSlideIndex(1);
            return;
        }
        
        if (n < 1) {
            setSlideIndex(slides.length);
            return;
        }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '');
        }
        
        slides[slideIndex -1].style.display ='block';
        dots[slideIndex -1].className += ' active';
    };

    /* props로 이미지 전달 */

    const imagesData = [
        {src: props.img, alt: "Img"},
        {src: props.img, alt: "Img"},
        {src: props.img, alt: "Img"},
    ];

    return (
        <div className="Carousel">
            <div className="slideshow-container">
                {imagesData.map((image, index) => (
                <div key={index} className={`mySlides fade ${index === slideIndex -1 ? 'active' : ''}`}>
                    <div className="numbertext">{index + 1} / {imagesData.length}</div>
                    <img src={image.src} alt={image.alt}/>
                </div>
                ))}
                <a className= "prev" onClick={() => plusSlides(-1)}>❮</a>
                <a class= "next" onClick={() => plusSlides(1)}>❯</a>
            </div>

            <br/>

            <div className="dots-container">
                {imagesData.map((_, index) => (
                    <span key={index} className={`dot ${index === slideIndex - 1 ? 'active' : ''}`} 
                    onClick={() => currentSlide(index + 1)}></span>
                ))}
            </div>
        </div>
    );
}

export default Carousel;