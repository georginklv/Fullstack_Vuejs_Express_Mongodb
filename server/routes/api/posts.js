const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

// Add Posts
router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res ) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send();
})


async function loadPostCollection() {
  console.error('post');
  const MongoClient = require('mongodb').MongoClient;
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://asd123:asd123@cluster0.s8g3s.mongodb.net/vue_express?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,useUnifiedTopology: true
    }
  );
  
  return client.db('vue_express').collection('vue_express');
}

module.exports = router;


