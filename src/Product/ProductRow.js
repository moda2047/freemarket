import "./ProductRow.css";
import ProductCard from "./ProductCard";
import React, {useState, useRef} from "react";

const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
};

function ProductRow({productList, num_cards, isScrollable}) {

    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState();

    const onDragStart = (e) => {
      e.preventDefault();
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    };
  
    const onDragEnd = () => {
      setIsDrag(false);
    };
  
    const onDragMove = (e) => {
        if (isDrag) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        
            scrollRef.current.scrollLeft = startX - e.pageX;
        
            if (scrollLeft === 0) {
                setStartX(e.pageX);
            } else if (scrollWidth <= clientWidth + scrollLeft) {
                setStartX(e.pageX + scrollLeft);
            }
        }
    };

    const delay = 0;
    const onThrottleDragMove = throttle(onDragMove, delay);

    return (
        <div className="productRow">
            <div class="productCard-container"
                onMouseDown={isScrollable ? onDragStart : undefined}
                onMouseMove={isScrollable ? onThrottleDragMove : undefined}
                onMouseUp={isScrollable ? onDragEnd : undefined}
                onMouseLeave={isScrollable ? onDragEnd : undefined}
                ref={scrollRef}
            >
                {productList && productList.map((m, index) => {
                    return (
                        <ProductCard product={m} key={index} />
                    );
                })}
            </div>
        </div>
    );
}

export default ProductRow;
