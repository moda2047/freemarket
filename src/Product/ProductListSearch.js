import "./ProductListSearch.css";
import ProductSidebar from "./ProductSidebar";
import ProductRow from "./ProductRow";

function ProductListSearch({productLists}) {

    const num_cards = 3;

    const isScrollable = false;

    return (
        <div className="productListSearch">
            {productLists.map((productList, index) => (
                <div class="productRow-container">
                        <div class="productRow-category"> 
                            <h3>{productList[0].category}</h3>
                        </div>
                    <ProductRow productList={productList} num_cards={num_cards} isScrollable={true}/>
                </div>
            ))}
        </div>
    );
}

export default ProductListSearch;