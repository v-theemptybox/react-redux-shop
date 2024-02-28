import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./DetailPage.module.css";
import { useDispatch, useSelector } from "react-redux";
const DetailPage = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [amount, setAmount] = useState(1);

  // use useLocation() to get state pass through <Link> in react-router
  const location = useLocation();
  const product = location.state;

  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCart);

  const url =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

  const fetchData = useCallback(async () => {
    const response = await fetch(url);

    const resData = await response.json();
    // get related product by category
    const filteredData = resData.filter(
      (prod) =>
        prod._id.$oid !== product._id.$oid && prod.category === product.category
    );

    setRelatedProducts(filteredData);
  }, [product.category, product._id.$oid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // change quantity of product
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      alert("Quantity must be greater than 0!");
    }
  };

  // add logic for button "Add to cart"
  const handleAddToCart = () => {
    // find existing product in cartList
    const existingProduct = listCart.find(
      (item) => item._id.$oid === product._id.$oid
    );

    // if product is found in cartList then dispatch UPDATE_CART action
    if (existingProduct) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...product, amount: existingProduct.amount + amount },
      });
    } else {
      // else dispatch ADD_CART action
      dispatch({
        type: "ADD_CART",
        payload: { ...product, amount },
      });
    }
  };

  return (
    <div className="container fst-italic fw-light">
      <div className="row mt-5">
        <div className="col-1">
          <img src={product.img1} alt={product.name} className="w-100 mt-2" />
          <img src={product.img2} alt={product.name} className="w-100 mt-2" />
          <img src={product.img3} alt={product.name} className="w-100 mt-2" />
          <img src={product.img4} alt={product.name} className="w-100 mt-2" />
        </div>
        <div className="col-4">
          <img src={product.img4} alt={product.name} className="w-100" />
        </div>
        <div className="col-7">
          <h2>{product.name}</h2>
          <h4>{(+product.price).toLocaleString("vi-VN")} VND</h4>
          <p>{product.short_desc}</p>
          <p>
            <strong>CATEGORY: </strong>
            {product.category}
          </p>
          <div className="d-flex">
            <div className="border d-flex justify-content-between align-items-center">
              <label htmlFor="quantityProd" className="ps-2">
                QUANTITY
              </label>
              <div className="w-50 text-end">
                <button className="btn" onClick={decreaseAmount}>
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <input
                  id={styles.quantityProd}
                  className="w-25 border-0 text-center"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                  type="number"
                />
                <button className="btn" onClick={increaseAmount}>
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
            </div>
            <button
              className="btn bg-black text-light rounded-0 fst-italic"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-3">
        <div className="col-12">
          <h2>
            <span className="badge bg-black rounded-0">DESCRIPTION</span>
          </h2>
          <h3>PRODUCT DESCRIPTION</h3>
          <p>{product.long_desc}</p>
        </div>
      </div>
      <div className="row">
        <h3 className="col-12">RELATED PRODUCTS</h3>

        {relatedProducts.map((prod) => {
          return (
            <div key={prod._id.$oid} className="col-3 text-center">
              <Link to={`/detail/${prod._id.$oid}`} state={prod}>
                <img src={prod.img1} alt={prod.name} className="w-100" />
              </Link>
              <p className="fw-medium">{prod.name}</p>
              <p>{(+prod.price).toLocaleString("vi-VN")} VND</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailPage;
