import styles from "./ProductList.module.css";

const ProductList = ({ productList }) => {
  return (
    <div className="col-10 col-sm-10">
      <div className="d-flex justify-content-between align-items-center">
        <input
          className="ps-2 pe-4 py-2"
          type="search"
          placeholder="Enter Search Here!"
        />
        <select className="h-25">
          <option>Default sorting</option>
        </select>
      </div>
      <div className="row mt-4 fst-italic">
        {productList.map((product) => {
          return (
            <div
              key={product._id.$oid}
              className={`${styles["animate-img"]} col-4 text-center`}
            >
              <img src={product.img1} alt={product.name} className="w-75 " />
              <p className="fw-medium mb-0">{product.name}</p>
              <p>{(+product.price).toLocaleString("vi-VN")} VND</p>
            </div>
          );
        })}
      </div>
      <nav className="text-light">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a
              className="page-link text-black fw-bold"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link bg-black text-light" href="#">
              1
            </a>
          </li>

          <li className="page-item">
            <a
              className="page-link text-black fw-bold"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
