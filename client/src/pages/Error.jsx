import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[78vh] bg-black text-center">

      <h1 className="text-7xl font-bold text-green-400 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-white mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default Error;