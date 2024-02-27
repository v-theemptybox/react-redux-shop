import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // validate form and user
  const validateInput = () => {
    if (!email || !password) {
      alert("Please fill out all information!");
      return false;
    }
    if (password.length <= 8) {
      alert("Password must be more than 8 characters");
      return false;
    }
    // check valid email
    const existingUser = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.email === email && user.password === password
    );
    if (existingUser) {
      const tempFullName = existingUser.fullName;
      setFullName(tempFullName);
      return tempFullName;
    } else {
      alert("Please check your email and password again!");
      return false;
    }
  };

  // sign in handler
  const handleSignIn = (e) => {
    const fullNameValue = validateInput();
    if (fullNameValue) {
      const onLoginUser = {
        email,
        password,
        fullName: fullNameValue,
      };
      localStorage.setItem("loginUser", JSON.stringify(onLoginUser));
      dispatch({ type: "ON_LOGIN" });
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div
      style={{ background: "url(./img-asm03/banner1.jpg)" }}
      className="w-100 min-vh-100"
    >
      <div className="container w-25 min-vh-100 d-flex justify-content-center align-items-center bg-transparent">
        <form
          className="w-100 text-center bg-white border rounded shadow"
          onSubmit={() => {
            handleSignIn();
          }}
        >
          <h3 className="fw-light fst-italic text-center my-5">Sign In</h3>

          <input
            type="email"
            placeholder="Email"
            className="w-75 py-3 px-2 border border-bottom-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-75 py-3 px-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="w-75 border-0 py-3 bg-black text-light mt-4"
            onClick={() => {
              handleSignIn();
            }}
          >
            SIGN IN
          </button>
          <p className="my-5 fst-italic text-secondary">
            Create an account?{" "}
            <Link to={"/register"} className="text-decoration-none">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
