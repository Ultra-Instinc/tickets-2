import Transactions from "./../models/transaction.model.js";
export const createTransaction = async (req, res) => {
	try {
		const { price, user_id } = req.body;
		const transaction = await Transactions.create({
			user_id,
			price,
		});
		res.status(200).json(transaction);
	} catch (error) {
		console.log("error in create transaction controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const getUserTransactions = async (req, res) => {
	try {
		const { user_id } = req.query;
		let transactions = await Transactions.find({ user_id });
		res.status(200).json(transactions);
	} catch (error) {
		console.log("error in get user transactions controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
