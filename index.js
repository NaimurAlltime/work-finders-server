const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT | 5000;

// middleware 
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ynccjdb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const experienceJobsCollection = client.db("workFindersDB").collection("experienceJobs");
    const fresherJobCollection = client.db("workFindersDB").collection("fresherJob");
    const companyCollection = client.db("workFindersDB").collection("itCompany");


      // experience jobs get api 
      app.get('/experience-jobs', async(req, res) => {
        const result = await experienceJobsCollection.find().toArray();
        res.send(result);
      })

      // fresher jobs get api 
      app.get('/fresher-jobs', async(req, res) => {
        const result = await fresherJobCollection.find().toArray();
        res.send(result);
      })
      
      

      // it-company get api 
      app.get('/it-company', async(req, res) => {
        const result = await companyCollection.find().toArray();
        res.send(result);
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("work finders server is running!");
})

app.listen(port, () => {
    console.log(`work finders server is running on port: ${port}`);
})