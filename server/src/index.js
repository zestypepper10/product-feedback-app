import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import config from "./config.js";

const app = express();
const PORT = process.env.PORT || 3000;

const ALLOWED_CATEGORIES = ["UI", "UX", "Enhancement", "Bug", "Feature"];

app.use(cors({ origin: config.frontendOrigins }));
app.use(express.json());

app.get("/get-all-suggestions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM suggestions ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions." });
  }
});

app.get("/get-suggestions-by-category/:category", async (req, res) => {
  const { category } = req.params;
  const normalizedCategory = ALLOWED_CATEGORIES.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );

  if (!normalizedCategory) {
    return res.status(400).json({ error: "Invalid category." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM suggestions WHERE category = $1 ORDER BY created_at DESC",
      [normalizedCategory]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions." });
  }
});

app.post("/add-one-suggestion", async (req, res) => {
  const { title, description, category } = req.body;

  const trimmedTitle = typeof title === "string" ? title.trim() : "";
  const trimmedDescription =
    typeof description === "string" ? description.trim() : "";
  const normalizedCategory = ALLOWED_CATEGORIES.find(
    (c) => c.toLowerCase() === String(category || "").toLowerCase()
  );

  const isValid =
    trimmedTitle.length > 0 &&
    trimmedTitle.length <= 100 &&
    trimmedDescription.length > 0 &&
    trimmedDescription.length <= 500 &&
    Boolean(normalizedCategory);

  if (!isValid) {
    return res.status(400).json({
      error: "Title, description, and a valid category are required.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO suggestions (title, description, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [trimmedTitle, trimmedDescription, normalizedCategory]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create suggestion." });
  }
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});