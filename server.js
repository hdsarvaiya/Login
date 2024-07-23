const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb+srv://hdsarvaiya142004:bG4prFr61oI9vRB1@cluster0.wykyqsn.mongodb.net/mernstack';
const dbName = 'yourDatabaseName';

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/save-form', async (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('registrations');
        await collection.insertOne(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving to MongoDB:', err);
        res.json({ success: false });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
