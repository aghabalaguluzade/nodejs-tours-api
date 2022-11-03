import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import conn from "./server.js";
import tourRoutes from "./routes/tourRouters.js";

const app = express();
conn();

// Express Use
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.use('/api/v1/tours',tourRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});