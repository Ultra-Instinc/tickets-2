import mongoose from "mongoose";
const eventsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		release_date: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ["Theater", "Play", "Cinema", "Concert"],
		},
		logo: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const Events = mongoose.model("Movie", eventsSchema);
export default Events;
