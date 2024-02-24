import React from "react";
import styles from "./Popup.module.css";

const Popup = ({
  setIsOpen,
  productImg,
  productDesc,
  productName,
  productPrice,
}) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={`${styles.modal} w-100 h-100`}>
          <div className={styles.modalContent}>
            <img src={productImg} alt="img" className="w-50" />
            <div>
              <h3 className="fw-normal">{productName}</h3>
              <h4 className="fw-normal">
                {(+productPrice).toLocaleString("vi-VN")} VND
              </h4>
              <p>{productDesc}</p>
              <button className="btn btn-dark px-5">View Detail</button>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              &#10006;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
