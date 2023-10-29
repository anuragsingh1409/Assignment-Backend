const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookieparser());
const port = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient;
app.get("/",async(req, res)=>{
    var url = "mongodb+srv://anurag14singh09:Anurag14@cluster0.utyjp3r.mongodb.net/";
    const client = new MongoClient(url);
    await client.connect().then(()=>{console.log("COnnected");}).catch(()=>{console.log("Error");});
    const db = client.db('projects');
    const collection= db.collection('project_collection');
  await collection.find({}).toArray().then(e=>res.send(e)).catch(e=>console.log(e));
  client.close().then(e=>console.log("Closed")).catch(e=>console.log("Error Closing"));
});
app.listen(port, (e)=>{
    console.log("Listening to the server on"+port);
});