import app from "./src/app.js";
import pool from "./src/config/database.js";

const PORT = process.env.PORT || 50003;

app.listen(PORT, async () => {
  console.log(`App is running on http://localhost:${PORT}`);
  try {
    await pool.getConnection();
    console.log("DB connected!");
  } catch (err) {
    console.log("DB connection error: ", err);
  }
});
