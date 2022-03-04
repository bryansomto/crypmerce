const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pino = require('express-pino-logger');
app.use(pino());

const cors = require('cors');
app.use(cors());

const farmer = { 'username': 'bryansomto@gmail.com', 'password': '0000' }

const { MongoClient, MongoServerError, MongoSystemError } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true });
const dbName = 'crypmerce';

app.get('/', (req, res) => {
    res.send(JSON.stringify('Hey there'));
});

app.post('/api/login', async (req, res) => {
    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db(dbName);
    const collection = db.collection('userdata')
    try{
        const findResult = await collection.find({ email: req.body.email }).toArray();
        if (req.body.password == findResult[0].password) {
            res.send(JSON.stringify('farmer'));
            console.log('success')
        }
        else {
            res.send(JSON.stringify('invalid password'));
        }
    } catch (error) {
        if (error instanceof MongoSystemError) {
            console.log(`Error worth logging: ${error}`);
        }
        else if (error) {
            res.send(JSON.stringify(`unregistered email`));
        }
        throw error
    }
    client.close();
})

// app.post('/api/signup', async (req, res) => {
//     await client.connect();
//     console.log('Connected successfully to the server');
//     const db = client.db(dbName);
//     const collection = db.collection('userdata')
//     try{
//         if (req.body.password == req.body.confirmPassword) {
//             collection.insertOne({ businessName: req.body.businessName, email: req.body.email, password: req.body.password, accountType: req.body.accountType });
//             // res.send(JSON.stringify('success'));
//         }
//         else {
//             res.send(JSON.stringify('invalid password'));
//         }
//     } catch (error) {
//         if (error instanceof MongoServerError) {
//             console.log(`Error worth logging: ${error}`);
//         }
//         throw error
//     }
//     client.close();
// })




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});