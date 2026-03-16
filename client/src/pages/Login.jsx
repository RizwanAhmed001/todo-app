import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TodoContext } from "../context/TodoContext";

const Login = () => {
  const [login, setLogin] = useState(true);

  const { backendUrl, navigate, setToken, setOwnerName } =
    useContext(TodoContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleData = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        backendUrl + `${login ? "/login" : "/register"}`,
        formData, { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(localStorage.getItem("token"));

        localStorage.setItem("name", response.data.userDetails.name);
        setOwnerName(localStorage.getItem("name"));

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[78vh] bg-black">

      {/* Register */}
      {!login && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-4 rounded-xl shadow-lg w-96 flex flex-col gap-4 border border-green-500"
        >
          <h1 className="text-2xl font-bold text-center text-green-400">
            Register
          </h1>

          <div className="flex flex-col gap-1">
            <label className="text-green-400">Name</label>
            <input
              value={formData.name}
              onChange={handleData}
              type="text"
              name="name"
              placeholder="Enter Name..."
              required
              className="bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-green-400">Email</label>
            <input
              value={formData.email}
              onChange={handleData}
              type="email"
              name="email"
              placeholder="Enter Email..."
              required
              className="bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-green-400">Password</label>
            <input
              value={formData.password}
              onChange={handleData}
              type="password"
              name="password"
              placeholder="Enter Password..."
              required
              className="bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 transition"
          >
            Submit
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setLogin(!login)}
              className="text-green-400 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      )}

      {/* Login */}
      {login && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4 border border-green-500"
        >
          <h1 className="text-2xl font-bold text-center text-green-400">
            Login
          </h1>

          <div className="flex flex-col gap-1">
            <label className="text-green-400">Email</label>
            <input
              value={formData.email}
              onChange={handleData}
              type="email"
              name="email"
              placeholder="Enter Email..."
              required
              className="bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-green-400">Password</label>
            <input
              value={formData.password}
              onChange={handleData}
              type="password"
              name="password"
              placeholder="Enter Password..."
              required
              className="bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 transition"
          >
            Submit
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setLogin(!login)}
              className="text-green-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
