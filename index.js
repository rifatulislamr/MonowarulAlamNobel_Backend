const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@codersot.pqlnaow.mongodb.net`;

async function run() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("nobelDb");
    const recentCollection = db.collection("recentNews");
    const allArticlesCollection = db.collection("allArticles");
    const politicsCollection = db.collection("politicalNews");
    const personalCollection = db.collection("personalNews");
    const socialNewsCollection = db.collection("socialNews");

    // Get all recent news
    app.get("/recent-news", async (req, res) => {
      try {
        // Fetch recent news from the MongoDB collection
        const recentNews = await recentCollection.find().toArray();
        res.json(recentNews);
      } catch (err) {
        console.error("Error fetching recent news:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get all articles
    app.get("/all-articles", async (req, res) => {
      try {
        // Fetch all articles from the MongoDB collection
        const allArticlesData = await allArticlesCollection.find().toArray();
        res.json(allArticlesData);
      } catch (err) {
        console.error("Error fetching all articles:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get recent news details by id
    app.get("/recent-news/:id", async (req, res) => {
      const postId = req.params.id;

      try {
        // Fetch post details from the MongoDB collection based on the unique id
        const postDetails = await recentCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!postDetails) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.json(postDetails);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get articles details by id
    app.get("/all-articles/:id", async (req, res) => {
      const postId = req.params.id;

      try {
        // Fetch post details from the MongoDB collection based on the unique id
        const postDetails = await allArticlesCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!postDetails) {
          res.status(404).json({ error: "Article not found" });
        } else {
          res.json(postDetails);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get all politics news
    app.get("/political-news", async (req, res) => {
      try {
        // Fetch all articles from the MongoDB collection
        const allNewsData = await politicsCollection.find().toArray();
        res.json(allNewsData);
      } catch (err) {
        console.error("Error fetching all articles:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get political news details by id
    app.get("/political-news/:id", async (req, res) => {
      const postId = req.params.id;

      try {
        // Fetch post details from the MongoDB collection based on the unique id
        const postDetails = await politicsCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!postDetails) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.json(postDetails);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get all personal news
    app.get("/personal-news", async (req, res) => {
      try {
        // Fetch all articles from the MongoDB collection
        const allNewsData = await personalCollection.find().toArray();
        res.json(allNewsData);
      } catch (err) {
        console.error("Error fetching all articles:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get personal news details by id
    app.get("/personal-news/:id", async (req, res) => {
      const postId = req.params.id;
      try {
        // Fetch post details from the MongoDB collection based on the unique id
        const postDetails = await personalCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!postDetails) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.json(postDetails);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get all social news
    app.get("/social-news", async (req, res) => {
      try {
        // Fetch all articles from the MongoDB collection
        const allNewsData = await socialNewsCollection.find().toArray();
        res.json(allNewsData);
      } catch (err) {
        console.error("Error fetching all articles:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define a route to get social news details by id
    app.get("/social-news/:id", async (req, res) => {
      const postId = req.params.id;
      try {
        // Fetch post details from the MongoDB collection based on the unique id
        const postDetails = await socialNewsCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!postDetails) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.json(postDetails);
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Testing connection
    app.get("/", (req, res) => {
      res.send("Nobel Bhai server is coming...");
    });

    // Set the server to listen on port 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
