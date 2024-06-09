import Events from "../models/events.model.js";

export const getEvents = async (req, res) => {
	try {
		const filter = req.query.filter;
		console.log({ filter });
		let events = await Events.find({ type: filter });
		res.status(200).json(events);
	} catch (error) {
		console.log("error in get events controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const getSingleEvent = async (req, res) => {
	try {
		const { id } = req.params;
		let event = await Events.findById(id);
		res.status(200).json(event);
	} catch (error) {
		console.log("error in get events controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const addEvent = async (req, res) => {
	try {
		const { name, release_date, description, logo, type, show_date } = req.body;
		let event = await Events.create({
			name,
			release_date,
			logo,
			type,
			description,
			show_date,
		});
		res.status(200).json(event);
	} catch (error) {
		console.log("error in add event controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;
		await Events.findByIdAndDelete(id);
		res.status(200).json({ message: "Deleted Successfully !" });
	} catch (error) {
		console.log("error in delete event controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const updateEvent = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedEvent = await Events.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedEvent);
	} catch (error) {
		console.log("error in update event controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
