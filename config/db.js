
//Function to connect to the database:
const dbconnect = () => {
    const mongoose = require("mongoose");
    console.log("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.qi0fs.mongodb.net/mern-project");
    mongoose
        .connect(
            "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.qi0fs.mongodb.net/mern-project",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                
            }
        )
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => ('failed to connect to MongoDB', err));

}
module.exports = dbconnect;