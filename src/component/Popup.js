import { useDispatch } from "react-redux";

import styles from "./Popup.module.css";

const Popup = ({ productImg, productDesc, productName, productPrice }) => {
  const dispatch = useDispatch();

  const hidePopup = () => {
    dispatch({ type: "HIDE_POPUP" });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => hidePopup()} />
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
            <button className={styles.closeBtn} onClick={() => hidePopup()}>
              &#10006;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
