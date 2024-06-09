import Tickets from "../models/tickets.model.js";

export const getTickets = async (req, res) => {
	try {
		const { event_id } = req.query;
		const { user_id } = req.query;
		let tickets;
		if (event_id) {
			tickets = await Tickets.find({ event_id });
		}
		if (user_id) {
			tickets = await Tickets.find({ user_id });
		}
		res.status(200).json(tickets);
	} catch (error) {
		console.log("error in get tickets controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const getSingleTicket = async (req, res) => {
	try {
		const { id } = req.params;
		let ticket = await Tickets.findById(id);
		res.status(200).json(ticket);
	} catch (error) {
		console.log("error in get tickets controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const buyTicket = async (req, res) => {
	try {
		const { seats } = req.body;
		const { event_id, user_id } = req.query;
		const tickets = [];
		for (let i = 0; i < seats.length; i++) {
			var currTicket = await Tickets.create({
				event_id,
				user_id,
				number: seats[i],
				status: true,
			});
			tickets.push(currTicket);
		}
		res.status(200).json(tickets);
	} catch (error) {
		console.log("error in buy tickets controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
export const deleteTicket = async (req, res) => {
	try {
		const { id } = req.params;
		console.log({ id });
		await Tickets.findByIdAndDelete(id);
		res.status(200).json({ message: "deleted!" });
	} catch (error) {
		console.log("error in delete tickets controller :", error.message);
		res.status(500).json({ error: "Internal server error !" });
	}
};
