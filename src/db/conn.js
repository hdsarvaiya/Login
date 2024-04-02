const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://hdsarvaiya142004:bG4prFr61oI9vRB1@cluster0.wykyqsn.mongodb.net/mernstack').then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });
