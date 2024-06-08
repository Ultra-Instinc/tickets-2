import Movies from "./../models/movies.model.js";
export const getMovies = async (req, res) => {
	try {
		const filter = req.query.filter;
		console.log({ filter });
		let movies = await Movies.find({ type: filter });
		res.status(200).json(movies);
	} catch (error) {
		console.log("error in get movies controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const addMovie = async (req, res) => {
	try {
		const { name, release_date, rating, logo, type, available_tickets } =
			req.body;
		let movie = await Movies.create({
			name,
			release_date,
			rating,
			logo,
			type,
			available_tickets,
		});
		res.status(200).json(movie);
	} catch (error) {
		console.log("error in add movie controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const deleteMovie = async (req, res) => {
	try {
		const { id } = req.params;
		await Movies.findByIdAndDelete(id);
		res.status(200).json({ message: "Deleted Successfully !" });
	} catch (error) {
		console.log("error in delete movies controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const updateMovie = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedMovie = await Movies.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedMovie);
	} catch (error) {
		console.log("error in get update controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
