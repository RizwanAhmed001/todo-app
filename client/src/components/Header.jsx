import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Link } from "react-router-dom";

const Header = () => {

  const { token, setToken } = useContext(TodoContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-black border-b border-green-500 text-green-400 shadow-md">

      <Link to="/">
        <h1 className="text-2xl font-bold hover:text-green-300 transition">
          Todo App
        </h1>
      </Link>

      {token ? (
        <button
          onClick={handleLogout}
          className="bg-green-500 text-black px-4 py-1 rounded-md font-semibold hover:bg-green-600 transition"
        >
          Log Out
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-green-500 text-black px-4 py-1 rounded-md font-semibold hover:bg-green-600 transition">
            Login
          </button>
        </Link>
      )}

    </div>
  );
};

export default Header;