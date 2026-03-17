import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import dashboard from "./routes/dashboard.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGO_URI");

app.use("/record", records);
app.use("/dashboard", dashboard);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
