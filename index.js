const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express()

//Middle ware
app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    res.send('Sigma server is running.')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.edl5qg1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
async function run(){
    try{

        const serviceCollection = client.db('danriyalSolutions').collection('services')
        const blogsCollection = client.db('danriyalSolutions').collection('blogs')

        app.get('/services',async(req,res)=>{
             const query = {};
             const services = await serviceCollection.find(query).toArray();
             console.log(services)
            res.send(services);
        })

        app.get('/shortServices',async(req,res)=>{
             const query = {};
             const services = await serviceCollection.find(query).limit(3).toArray();
             console.log(services)
            res.send(services);
        })

        app.get('/blogs',async(req,res)=>{
             const query = {};
             const blogs = await blogsCollection.find(query).toArray();
          
            res.send(blogs);
        })

        app.get('/shortBlogs',async(req,res)=>{
             const query = {};
             const blogs = await blogsCollection.find(query).limit(2).toArray();
          
            res.send(blogs);
        })
    }
    finally{

    }
}

run().catch(console.log)





app.listen(port,()=>console.log(`server running on port ${port}`))