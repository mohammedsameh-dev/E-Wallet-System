import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();

    const name = nameInput.current.value.trim();
    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value;

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      return toast.error("Email already registered");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      balance: 0,
      transactions: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserId", newUser.id);

    toast.success("Account created successfully");
    navigate("/");
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-amber-100 dark:bg-gray-900">
      <form
        onSubmit={register}
        className="h-[60vh] flex flex-col justify-center items-center gap-5 bg-emerald-700/50 rounded-2xl p-6 md:w-96 w-[80vw]"
      >
        <h1 className="text-3xl font-bold text-emerald-950">Register</h1>

        <input
          ref={nameInput}
          type="text"
          placeholder="Enter your Name"
          className="input w-full px-4 py-2 rounded-lg"
        />
        <input
          ref={emailInput}
          type="email"
          placeholder="Enter your Email"
          autoComplete="email"
          className="input w-full px-4 py-2 rounded-lg"
        />
        <input
          ref={passwordInput}
          type="password"
          placeholder="Enter your Password"
          autoComplete="new-password"
          className="input w-full px-4 py-2 rounded-lg"
        />

        <button className="btn text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
}
