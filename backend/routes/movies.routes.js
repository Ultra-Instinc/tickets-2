import express from "express";
import {
	addMovie,
	deleteMovie,
	getMovies,
	updateMovie,
} from "../controllers/movies.controller.js";
// import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;
