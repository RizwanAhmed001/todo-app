import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">

      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        theme="dark"
      />

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;