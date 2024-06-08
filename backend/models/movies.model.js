import mongoose from "mongoose";
const moviesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		available_tickets: {
			type: Number,
			required: true,
		},
		release_date: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ["Movie", "Play", "Cinema", "Concert"],
		},
		logo: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Movies = mongoose.model("Movie", moviesSchema);
export default Movies;
