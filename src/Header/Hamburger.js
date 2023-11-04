import "./Hamburger.css";
import React, { useState } from 'react';

function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav class="hamburger">
                <button onClick={toggleMenu}>
                    <a class="menu-trigger" href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </button>
                {isOpen && (
                <ul class="menu-list">
                    <li><a href="#">의류</a></li>
                    <li><a href="#">신발</a></li>
                    <li><a href="#">생활용품</a></li>
                    <li><a href="#">반려동물용품</a></li>
                    <li><a href="#">한정판</a></li>
                    <li><a href="#">도서</a></li>
                    <li><a href="#">핸드폰</a></li>
                    <li><a href="#">전자제품</a></li>
                    <li><a href="#">공구</a></li>
                    <li><a href="#">예체능용품</a></li>
                    <li><a href="#">악세사리</a></li>
                    <li><a href="#">기타</a></li>
                </ul>
            )}
            </nav>
        </div>
    );
  }
  
  export default Hamburger;
  