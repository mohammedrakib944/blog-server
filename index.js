import app from "./src/app.js";
import pool from "./src/config/database.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log("App is running on http://localhost:8080");
  try {
    await pool.getConnection();
    console.log("DB connected!");
  } catch (err) {
    console.log("DB connection error: ", err);
  }
});
