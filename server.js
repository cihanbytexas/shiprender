import express from "express";
import { createShip } from "./ShipCanvas.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Ship endpoint
app.get("/ship", async (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) {
    return res.status(400).send("Kardeşim iki avatar linki lazım ?user1=...&user2=...");
  }

  try {
    const imgBuffer = await createShip(user1, user2);
    res.set("Content-Type", "image/png");
    res.send(imgBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Hata oluştu ship yaparken.");
  }
});

// Root test
app.get("/", (req, res) => {
  res.send("Ship API çalışıyor 🚀 Kullan: /ship?user1=URL&user2=URL");
});

app.listen(PORT, () => console.log(`✅ Ship API ${PORT} portunda çalışıyor`));
