import mongoose from "mongoose";

var { Schema } = mongoose;
mongoose.Promise = global.Promise;

var expenseSchema = new Schema(
  {
    //creating collections
    name: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
