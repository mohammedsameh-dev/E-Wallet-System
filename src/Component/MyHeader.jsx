import { Link } from "react-router-dom";
export default function MyHeader() {
  return (
    <header className="bg-blue-600 text-white h-[10vh]">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">MyLogo</div>
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:underline">HomePage</Link>
          <Link to="/LoginPage" className="hover:underline">LoginPage</Link>
          <Link to="/AdminPage" className="hover:underline">AdminPage</Link>
        </div>

      </nav>
    </header>
  );
}