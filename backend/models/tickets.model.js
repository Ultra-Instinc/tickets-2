import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		movie_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Movies",
		},
		number: {
			type: Number,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

const Tickets = mongoose.model("Ticket", ticketSchema);
export default Tickets;
