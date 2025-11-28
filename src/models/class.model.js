import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter title class"],
  },
  description: {
    type: String,
    required: [true, "Enter description"],
  },
  date: { type: Date, required: [true, "Enter date"] },
  capacity: { type: Number, required: [true, "enter capacity"] },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;
