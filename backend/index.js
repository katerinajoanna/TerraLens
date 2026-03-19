import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

//  middleware
app.use(express.json());

//  endpoint /places
app.get("/places", (req, res) => {
    const filePath = path.resolve(__dirname, "data/places.json");
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
});

//  endpoint testowy "/"
app.get("/", (req, res) => {
    res.send("działa");
});

// start serwera
app.listen(3000, () => {
    console.log("Server działa na http://localhost:3000");
});