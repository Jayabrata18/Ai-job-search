const express = require("express");
const fs = require("fs");
const csvParser = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 5555;

app.use(cors()); // Enable CORS for cross-origin requests

// Route to serve CSV data
app.get("", (req, res) => {
    const results = [];
    fs.createReadStream("final_output_result1.csv")
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            res.json(results); // Send the parsed CSV as JSON
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
