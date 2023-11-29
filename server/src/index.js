import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { eventsRouter } from "./routes/events.js";
import { attendeeRouter } from "./routes/attendee.js";
import { adminRouter } from "./routes/admin.js";
import { fetchUsersRouter } from "./routes/fetchUsers.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/events", eventsRouter);
app.use("/attendee", attendeeRouter);
app.use("/admin", adminRouter);
app.use("/users", fetchUsersRouter);

const { MONGODB_URI, PORT } = process.env;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
