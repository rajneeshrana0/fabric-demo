const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/test";
function main() {
    mongoose.connect(uri).then(() => {
        console.log("Successful connection to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = { main };
