import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";

const DetailPage = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  // use useLocation() to get state pass through <Link> in react-router
  const location = useLocation();
  const product = location.state;

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

  return (
    <div className="container">
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
          <input type="number" placeholder="QUANTITY" />
          <button className="btn bg-black text-light">Add to cart</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>
            <span className="badge bg-black">DESCRIPTION</span>
          </h2>
          <h3>PRODUCT DESCRIPTION</h3>
          <p>{product.long_desc}</p>
        </div>
      </div>
      <div className="row">
        <h3 className="col-12">RELATED PRODUCTS</h3>
        {/* hiển thị danh sách product cùng category */}
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
