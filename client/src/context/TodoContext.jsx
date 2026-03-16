import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TodoContext = createContext({});

const MyTodoContext = ({children}) => {

  const backendUrl = "https://todo-app-backend-1dd3.onrender.com/api";

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [ownerName, setOwnerName] = useState(localStorage.getItem("name") || "")

  const myValue = {
    backendUrl,
    token, 
    setToken,
    navigate,
    ownerName,
    setOwnerName
  };

  return(
    <TodoContext.Provider value={myValue}>
      {children}
    </TodoContext.Provider>
  )
}

export default MyTodoContext;
