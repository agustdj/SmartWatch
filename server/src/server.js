const mongoose = require("mongoose");
const app = require("./app");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch(console.log);
