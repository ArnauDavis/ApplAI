import express from "express";
import routes from "./routes/index.ts";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(
    `Backend server running on port ${PORT}`
  );
});