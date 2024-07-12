import { config } from "dotenv";
config();

import app from "./app";

const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", async () => {
  console.log("Server is up and running");
});
