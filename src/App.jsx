import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import HomePage from "./Pages/HomePage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./Pages/RegisterPage";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
