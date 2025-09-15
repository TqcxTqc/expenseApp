import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
	{
		description: { type: String, required: false, default: "" },
		amount: { type: Number, required: true },
		category: { type: String, required: true },
		date: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Expense", expenseSchema);
