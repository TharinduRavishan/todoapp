import express from "express";
import DB from "./config/db";
import CORS from "./middlewares/cors";
import notFound from "./middlewares/notFound";
import error from "./middlewares/error";
import auth from './middlewares/auth';
import { restRouter, publicRouter } from "./api";

const app = express();
const PORT = 3000;

//crate database connection
DB.connect();

app.use(express.json());
app.use(CORS.handleCors);
app.use("/auth", publicRouter);
app.use(auth);
app.use("/api", restRouter);
app.use(notFound);
app.use(error);

app.listen(PORT, () => {
    console.log(`server is running at PORT http://localhost:${PORT}`);
});