import express from "express";
import productRouter from "./src/routers/product";
import authRouter from "./src/routers/auth";
import categoryRouter from "./src/routers/category";
import mongoose from "mongoose";
import cors from "cors"
const app = express();

// middleware
app.use(express.json());

app.use(cors())
// router
app.use("/api", productRouter);
app.use("/api", authRouter)
app.use("/api", categoryRouter)

mongoose.connect("mongodb://127.0.0.1:27017/we17301");

export const viteNodeApp = app;
