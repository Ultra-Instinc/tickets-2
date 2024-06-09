import express from "express";
import {
	addEvent,
	deleteEvent,
	getEvents,
	getSingleEvent,
	updateEvent,
} from "../controllers/events.controller.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getSingleEvent);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

export default router;
