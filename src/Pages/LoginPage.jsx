import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (el) => el.email === email && el.password == password
    );

    if (user) {
      localStorage.setItem("currentUserId", user.id);
      toast.success("Login Successfully");
      navigate("/");
    } else {
      toast.error("Wrong Email or Password");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-amber-200 dark:bg-gray-300">
      <form
        onSubmit={login}
        className="h-[50vh] flex flex-col justify-center items-center gap-5 bg-emerald-700/50 rounded-4xl md:w-100 lg:w-100 w-[80vw]"
      >
        <h1 className="text-4xl text-emerald-950">Login</h1>
        <input
          ref={emailInput}
          type="text"
          placeholder="Enter your Email:"
          autoComplete="email"
          className="input md:w-70 w-[70vw]"
        />
        <input
          ref={passwordInput}
          type="password"
          placeholder="Enter your Password:"
          autoComplete="current-password"
          className="input md:w-70 w-[70vw]"
        />
        <button className="btn text-blue-500 bg-cyan-500 w-50 hover:bg-amber-500">
          Submit
        </button>
      </form>
    </div>
  );
}
