import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.navbar} container`}>
      <div className={styles["btn-nav"]}>
        <button
          id={styles.homeBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </button>
      </div>
      <h1 className={styles.logo}>BOUTIQUE</h1>
      <div className={styles["btn-nav"]}>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
