import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
  },
  asignedUser: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
});

export default mongoose.model("Todotask", todoSchema);

//asignedUser: String       null      id
//completedAt: Date          date
