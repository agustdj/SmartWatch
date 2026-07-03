const mongoose = require("mongoose");
const app = require("./app");
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch(console.log);
