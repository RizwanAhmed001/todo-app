import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";

const Home = () => {
  const { token, ownerName, backendUrl } = useContext(TodoContext);
  const [render, setrender] = useState(false);

  const [editOn, setEditOn] = useState(false);
  const [editId, setEditId] = useState(null);

  const [myComplete, setMyComplete] = useState(false);

  const [myTodo, setMyTodo] = useState({
    title: "",
    description: "",
  });


  const handleMyTodo = (event) => {
    const { name, value } = event.target;
    setMyTodo((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        backendUrl + "/todo",
        { ...myTodo, complete: myComplete },
        { headers: { token } },
      );

      if (response.data.success === true) {
        toast.success("New Todo Added");
        setMyTodo({ title: "", description: "" });
        setrender(!render);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [todoList, setMyTodoList] = useState([]);

  const gettingData = async () => {
    try {
      const response = await axios.get(backendUrl + "/alltodo", {
        headers: { token },
      });

      if (response.data.success === true) {
        setMyTodoList(response.data.allData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/deletetodo/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast("Todo Deleted");
        location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDone = async (id) => {
    try {
      console.log("Hatt");
      const response = await axios.put(
        backendUrl + `/updatetodocomplete/${id}`,
        {}, // no body needed
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success("Todo Marked Completed");
        setrender(!render); // better than reload
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (todoData) => {
      setEditOn(true);
      setEditId(todoData._id);
      setMyTodo({ title: todoData.title, description: todoData.description });
  };

  const handleEditFuction = async () => {
    try {
      const response = await axios.put(backendUrl + `/updatetodo/${editId}`, {...myTodo, complete: myComplete}, {headers: {token}})
      if(response.data.success){
        toast("Todo Updated");
        setrender(!render)
        setEditOn(!editOn)
        setEditId(null);
        setMyTodo({ title: "", description: "" })
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      gettingData();
    }
  }, [render, token]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Not Logged In */}
      {!token && (
        <div className="min-h-[78vh] flex items-center justify-center">
          <div className="bg-gray-900 border border-green-500 shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
            <h1 className="text-3xl font-bold text-green-400 mb-3">
              Please Login First
            </h1>

            <p className="text-gray-400 mb-6">
              You need to login to access your todos and manage your tasks.
            </p>

            <Link to="/login">
              <button className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md">
                Go to Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Logged In */}
      {token && (
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
            My Todos
          </h1>

          {/* Todo Form */}
          <div className="bg-gray-900 border border-green-500 rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  // value={editOn ? editMyTodo : myTodo.title}
                  value={myTodo.title}
                  onChange={handleMyTodo}
                  type="text"
                  placeholder="Todo Title..."
                  name="title"
                  id="title"
                  required
                  className="flex-1 bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  // value={editOn ? editMyTodo : myTodo.description}
                  value={myTodo.description}
                  onChange={handleMyTodo}
                  type="text"
                  placeholder="Todo Description..."
                  name="description"
                  id="description"
                  required
                  className="flex-1 bg-black border border-green-500 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {!editOn && (
                  <button
                    type="submit"
                    className="bg-green-500 text-black px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition"
                  >
                    Add
                  </button>
                )}

                {editOn && (
                  <div
                    type="submit"
                    onClick={handleEditFuction}
                    className="bg-green-500 text-black px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition"
                  >
                    Update
                  </div>
                )}
              </div>

              {/* Todo / Complete Toggle */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMyComplete(false)}
                  className={`px-4 py-1 rounded-md border ${
                    !myComplete
                      ? "bg-green-500 text-black"
                      : "border-green-500 text-green-400"
                  }`}
                >
                  Todo
                </button>

                <button
                  type="button"
                  onClick={() => setMyComplete(true)}
                  className={`px-4 py-1 rounded-md border ${
                    myComplete
                      ? "bg-green-500 text-black"
                      : "border-green-500 text-green-400"
                  }`}
                >
                  Complete
                </button>
              </div>
            </form>
          </div>

          {/* Todo List */}
          <div className="mt-8 flex flex-col gap-4">
            {todoList.length === 0 ? (
              <div className="text-center text-gray-400 text-lg">
                Enter Your First Todo ✨
              </div>
            ) : (
              todoList.map((todo) => (
                <div
                  key={todo._id}
                  className="bg-gray-900 border border-green-500 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-green-400 font-semibold text-lg">
                      {todo.title}
                    </h2>

                    <p className="text-gray-300">{todo.description}</p>

                    {todo.complete && (
                      <p className="text-xs text-gray-400 mt-1">
                        Completed at:{" "}
                        {new Date(todo.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 text-xl text-green-400">
                    <MdDeleteOutline
                      onClick={() => handleDelete(todo._id)}
                      className="cursor-pointer hover:text-red-500 transition"
                    />

                    {!todo.complete && (
                      <>
                        <FaRegEdit
                          onClick={() => handleEdit(todo)}
                          className="cursor-pointer hover:text-yellow-400 transition"
                        />
                        <MdOutlineDone
                          onClick={() => handleDone(todo._id)}
                          className="cursor-pointer hover:text-green-300 transition"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <p className="text-center text-gray-400 mt-10 flex justify-end px-3">
            <span className="text-green-400 font-semibold">{ownerName}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
