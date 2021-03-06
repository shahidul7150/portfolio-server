const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ocn3w.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() { 
    try {

        await client.connect();
        const projectCollection = client.db("portfolio").collection("project");


        app.get("/service", async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const service = await projectCollection.findOne(query);
            res.send(service);
        })

     }
    finally{}
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("Portfolio");
  });
  
  app.listen(port, () => {
    console.log("Portfolio is running", port);
  });