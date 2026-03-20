import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { __dirname } from "./utils/path.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//  endpoint /places
app.get("/places", async (req, res) => {
    try {
        // Składam ścieżkę: wychodzisz z utils (..), wchodzisz do data
        const filePath = path.join(__dirname, "..", "data/places.json");
        const data = await fs.readFile(filePath, "utf-8");

        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Blad pliku:", error);
        res.status(500).send("Blad odczytu danych");
    }
});

//  endpoint testowy "/"
app.get("/", (req, res) => {
    res.send("Serwer smiga!!!");
});

// start serwera
app.listen(PORT, () => {
    console.log(`Server działa na porcie ${PORT}`);
});