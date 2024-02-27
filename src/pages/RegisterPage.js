import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [userArr, setUserArr] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const navigate = useNavigate();

  // validate form
  const validateInput = () => {
    if (!email || !password || !fullName || !phone) {
      alert("Please fill out all information!");
      return false;
    }
    if (password.length <= 8) {
      alert("Password must be more than 8 characters");
      return false;
    }
    // check duplicate email
    const existingUser = userArr.find((user) => user.email === email);
    if (existingUser) {
      alert("Email already exists! Please use a different email address.");
      return false;
    }
    return true;
  };

  // sign in handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (validateInput()) {
      const newUser = { email, password, fullName, phone };
      setUserArr([...userArr, newUser]);
      localStorage.setItem("users", JSON.stringify([...userArr, newUser]));
      setEmail("");
      setPassword("");
      setFullName("");
      setPhone("");
      navigate("/login");
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
          onSubmit={submitHandler}
        >
          <h3 className="fw-light fst-italic text-center my-5">Sign Up</h3>

          <input
            type="text"
            placeholder="Full Name"
            className="w-75 py-3 px-2 border border-bottom-0"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            className="w-75 py-3 px-2 border border-bottom-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="tel"
            maxLength="10"
            placeholder="Phone"
            className="w-75 py-3 px-2 border"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="w-75 border-0 py-3 bg-black text-light mt-4"
          >
            SIGN UP
          </button>
          <p className="my-5 fst-italic text-secondary">
            Login?{" "}
            <Link to={"/login"} className="text-decoration-none">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
