import express from "express";
import {
	createTransaction,
	getUserTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getUserTransactions);
// router.get("/", getTickets);

export default router;
