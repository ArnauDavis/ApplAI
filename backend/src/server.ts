import express from "express";
import routes from "./routes/index.ts";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", routes);

// Centralized error handler
app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("API error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

app.listen(PORT, () => {
  console.log(
    `Backend server running on port ${PORT}`
  );
});