import express from "express";

import { buyTicket, getTickets } from "../controllers/tickets.controller.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", buyTicket);

export default router;
