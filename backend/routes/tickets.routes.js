import express from "express";

import {
	buyTicket,
	deleteTicket,
	deleteUserTickets,
	getSingleTicket,
	getTickets,
} from "../controllers/tickets.controller.js";

const router = express.Router();

router.get("/", getTickets);
router.get("/:id", getSingleTicket);
router.post("/", buyTicket);
router.delete("/:id", deleteTicket);
router.delete("/", deleteUserTickets);

export default router;
