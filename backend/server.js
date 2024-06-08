import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import cors from "cors";

import AuthRoutes from "./routes/auth.routes.js";
import eventsRoute from "./routes/events.routes.js";
import ticketsRoute from "./routes/tickets.routes.js";

import connectToMongoDB from "./db/connetToMongoDB.js";

const port = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to access cookies => (authenticating users)

app.use("/api/auth", AuthRoutes);
app.use("/api/events", eventsRoute);
app.use("/api/tickets", ticketsRoute);

app.listen(port, () => {
	connectToMongoDB();
	console.log(`server is on port : ${port}`);
});
