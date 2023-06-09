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

        // const serviceCollection = client.db('danriyalSolutions').collection('services')
        // const blogsCollection = client.db('danriyalSolutions').collection('blogs')
        const userCollection = client.db('danriyalSolutions').collection('user');
        const depositCollection = client.db('danriyalSolutions').collection('deposit');
        const withdrawCollection = client.db('danriyalSolutions').collection('withdraw');


        app.post('/user',async(req,res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.post('/deposit',async(req,res)=>{
            const deposit = req.body;
            const result = await depositCollection.insertOne(deposit);
            res.send(result);
        })

        app.post('/withdraw',async(req,res)=>{
            const withdraw = req.body;
            const result = await withdrawCollection.insertOne(withdraw);
            res.send(result);
        })

        app.get('/users',async(req,res)=>{
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })

        app.get('/loginUser',async(req,res)=>{
            const phone = req.query.phone;
            const password = req.query.password;

            const query = {phone,password};
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.get('/deposits',async(req,res)=>{
            const query = {};
            const deposits = await depositCollection.find(query).toArray();
            res.send(deposits);
        })

        app.get('/withdraws',async(req,res)=>{
            const query = {};
            const withdraws = await withdrawCollection.find(query).toArray();
            res.send(withdraws);
        })

        // app.get('/services',async(req,res)=>{
        //      const query = {};
        //      const services = await serviceCollection.find(query).toArray();
        //      console.log(services)
        //     res.send(services);
        // })

        // app.get('/shortServices',async(req,res)=>{
        //      const query = {};
        //      const services = await serviceCollection.find(query).limit(3).toArray();
        //      console.log(services)
        //     res.send(services);
        // })

        // app.get('/blogs',async(req,res)=>{
        //      const query = {};
        //      const blogs = await blogsCollection.find(query).toArray();
          
        //     res.send(blogs);
        // })

        // app.get('/shortBlogs',async(req,res)=>{
        //      const query = {};
        //      const blogs = await blogsCollection.find(query).limit(2).toArray();
          
        //     res.send(blogs);
        // })
    }
    finally{

    }
}

run().catch(console.log)





app.listen(port,()=>console.log(`server running on port ${port}`))