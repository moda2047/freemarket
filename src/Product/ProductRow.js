// import "./ProductRow.css";
// import ProductCard from "./ProductCard";
// import { Link } from "react-router-dom";
// import React from "react";

// function ProductRow({ productList }) {
    
//     const cardPerRow = 4;
//     const slicedList = [];

//     for (let i = 0; i < productList.length; i += cardPerRow) {
//         const chunk = productList.slice(i, i + cardPerRow);
//         slicedList.push(chunk);
//     }

//     return (
//         <div className="productRow">
//             {slicedList.map((row, rowIndex) => (
//                 <div className="productRow-row">
//                     {row.map((product, index) => {
//                         <ProductCard product={product} key={index} />
//                     })}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ProductRow;
