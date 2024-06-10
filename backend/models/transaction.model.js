import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Transactions = mongoose.model("Transaction", transactionSchema);
export default Transactions;
