import TodoModel from "../models/todo.model.js";
import UserModel from "../models/user.model.js";

export const todo = async (req, res) => {
  try {
    const { title, description, complete } = req.body;

    const id = req.userId;

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res.json({ success: false, message: "No Such User Exist!" });
    }

    if (!title || !description || complete === undefined) {
      return res.json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const newTodo = new TodoModel({ user: id, title, description, complete });

    await newTodo.save();

    return res.json({ success: true, message: "Todo Added!", newTodo });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const id = req.userId;

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res.json({ success: false, message: "No Such User Exist!" });
    }

    const allData = await TodoModel.find({ user: id }).populate("user");

    if (allData.length == 0) {
      return res.json({ success: false, message: "No Data" });
    }

    return res.json({ success: true, message: "Data Received", allData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoid } = req.params;

    if (!todoid) {
      return res.json({ success: false, message: "No Such Todo Exist" });
    }

    const userId = req.userId;

    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res.json({ success: false, message: "No Such User Exist!" });
    }

    const deletedTodo = await TodoModel.findByIdAndDelete({
      _id: todoid,
      user: userId,
    });

    if (!deletedTodo) {
      return res.json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    return res.json({ success: true, message: "Todo Deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoid } = req.params;

    if (!todoid) {
      return res.json({ success: false, message: "No Such Todo Exist!" });
    }

    const userId = req.userId;

    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res.json({ success: false, message: "No Such User Exist!" });
    }

    const { title, description, complete } = req.body;

    if (!title || !description || complete == undefined) {
      return res.json({
        success: false,
        message: "Please Provide All fields!",
      });
    }

    const updatingTodo = await TodoModel.findOneAndUpdate(
      { _id: todoid, user: userId },
      { title, description, complete },
      { new: true },
    );

    if (!updatingTodo) {
      return res.json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    return res.json({
      success: true,
      message: "Todo Updated",
      updatingTodo
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const todoComplete = async (req, res) => {
  try {
    const {todoid} = req.params;
    if (!todoid) {
      return res.json({ success: false, message: "No Such Todo Exist!" });
    }

    const userId = req.userId;

    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res.json({ success: false, message: "No Such User Exist!" });
    }

    const updateTodo = await TodoModel.findOneAndUpdate({_id: todoid, user: userId}, {complete: true}, {new: true})

    if(!updateTodo){
      return res.json({success: false, message: "Todo does not exist!"})
    }

    return res.json({success: true, message: "Todo marked as complete", updateTodo})


  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}


