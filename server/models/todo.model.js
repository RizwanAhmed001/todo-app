import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    description: {type: String, required: true},
    complete: {type: Boolean, required: true},
  },
  {
    timestamps: true
  }
);

const TodoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default TodoModel;