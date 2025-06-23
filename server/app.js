import express from "express";
import connectDB from "./config/dbConfig.js";
import urlRouter from "./routers/url.routes.js";
import userRouter from "./routers/user.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/sNs", urlRouter);
app.use("/sNs", userRouter);

const PORT = 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}...`);
});
