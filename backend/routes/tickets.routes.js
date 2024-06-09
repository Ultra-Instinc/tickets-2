import express from "express";

import {
	buyTicket,
	deleteTicket,
	getSingleTicket,
	getTickets,
} from "../controllers/tickets.controller.js";

const router = express.Router();

router.get("/", getTickets);
router.get("/:id", getSingleTicket);
router.post("/", buyTicket);
router.delete("/:id", deleteTicket);

export default router;
