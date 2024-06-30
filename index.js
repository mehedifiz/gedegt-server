const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5010;


app.use(cors());
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";

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
    await client.connect();

    const productCOll = client.db('productDB').collection('product');
    const  user = client.db('user').collection('user');

    app.post('/addproduct' , async(req , res )=>{
      console.log(req.body);
      const newProduct = req.body ;
      const result = await productCOll.insertOne( newProduct)
      res.send(result)

    })

    app.get('/singleproduct/:id',async(req , res)=>{
      console.log(req.params.id)
      const result = await productCOll.findOne({_id : new ObjectId(req.params.id)})

      res.send(result)
    })

    app.get('/myproducts/:email',async(req ,res)=>{
      console.log(req.params.email);
      const email = req.params.email;
      const result = await  productCOll.find({email : email }).toArray()
      res.send(result)
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









app.get('/', (req ,res )=>{
    res.send('gedget server is running')
    })
    
    
    app.listen(port , ()=>{
        console.log(`gedget server is running on port : ${port} `)
    })