import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  text: String,
  completed: Boolean,
  createdAt: Date,
  editedAt: Date,
  completedAt: Date,
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);