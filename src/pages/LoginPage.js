import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div
      style={{ background: "url(./img-asm03/banner1.jpg)" }}
      className="w-100 min-vh-100"
    >
      <div className="container w-25 min-vh-100 d-flex justify-content-center align-items-center bg-transparent">
        <form className="w-100 text-center bg-white border rounded">
          <h3 className="fw-light fst-italic text-center my-5">Sign In</h3>

          <input
            type="email"
            class="form-control"
            placeholder="Email"
            className="w-75 py-3 px-2 border border-bottom-0"
          />
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            className="w-75 py-3 px-2 border "
          />

          <button className="w-75 border-0 py-3 bg-black text-light mt-4">
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
