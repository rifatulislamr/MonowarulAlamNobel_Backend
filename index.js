const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@codersot.pqlnaow.mongodb.net`;

async function run() {
  const client = new MongoClient(url);

  try {
    //  connecting with db
    await client.connect();

    const db = client.db("nobelDb");
    const recentCollection = db.collection("recentNews");
    const allArticlesCollection = db.collection("allArticles");
    const politicsCollection = db.collection("politicalNews");
    const personalCollection = db.collection("personalNews");
    const socialNewsCollection = db.collection("socialNews");
    const videosCollection = db.collection("videos");

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



    // Post request for recent news
    app.post("/recent-news/addData", async (req, res) => {
      const { title, subtitle, image } = req.body;
      console.log("API hit from frontend from recent news");

      try {
        // Create a new document with the submitted data
        const newData = { title, subtitle, image };

        // Get the current documents in the collection
        const currentData = await recentCollection.find().toArray();

        // Insert the new document at the beginning of the array
        currentData.unshift(newData);

        // Update the entire collection with the modified array
        await recentCollection.deleteMany({}); // Delete all documents in the collection
        await recentCollection.insertMany(currentData); // Insert the modified array

        // Send a success response
        res.status(200).json({ message: "Data added successfully" });
      } catch (error) {
        // Log the error for debugging
        console.error("Error adding data:", error);

        // Send an error response
        res.status(500).json({ message: "Internal server error" });
      }
    });



    // Post request for personal news
    app.post("/personal-news/addData", async (req, res) => {
      const { title, subtitle, image } = req.body;
      console.log("API hit from frontend from personal news");

      try {
        // Create a new document with the submitted data
        const newData = { title, subtitle, image };

        // Get the current documents in the collection
        const currentData = await personalCollection.find().toArray();

        // Insert the new document at the beginning of the array
        currentData.unshift(newData);

        // Update the entire collection with the modified array
        await personalCollection.deleteMany({}); // Delete all documents in the collection
        await personalCollection.insertMany(currentData); // Insert the modified array

        // Send a success response
        res.status(200).json({ message: "Data added successfully" });
      } catch (error) {
        // Log the error for debugging
        console.error("Error adding data:", error);

        // Send an error response
        res.status(500).json({ message: "Internal server error" });
      }
    });



    // Post request for social news
    app.post("/social-news/addData", async (req, res) => {
      const { title, subtitle, image } = req.body;
      console.log("API hit from frontend from personal news");

      try {
        // Create a new document with the submitted data
        const newData = { title, subtitle, image };

        // Get the current documents in the collection
        const currentData = await socialNewsCollection.find().toArray();

        // Insert the new document at the beginning of the array
        currentData.unshift(newData);

        // Update the entire collection with the modified array
        await socialNewsCollection.deleteMany({}); // Delete all documents in the collection
        await socialNewsCollection.insertMany(currentData); // Insert the modified array

        // Send a success response
        res.status(200).json({ message: "Data added successfully" });
      } catch (error) {
        // Log the error for debugging
        console.error("Error adding data:", error);

        // Send an error response
        res.status(500).json({ message: "Internal server error" });
      }
    });


    // Post request for political news
    app.post("/political-news/addData", async (req, res) => {
      const { title, subtitle, image } = req.body;
      console.log("API hit from frontend from personal news");

      try {
        // Create a new document with the submitted data
        const newData = { title, subtitle, image };

        // Get the current documents in the collection
        const currentData = await politicsCollection.find().toArray();

        // Insert the new document at the beginning of the array
        currentData.unshift(newData);

        // Update the entire collection with the modified array
        await politicsCollection.deleteMany({}); // Delete all documents in the collection
        await politicsCollection.insertMany(currentData); // Insert the modified array

        // Send a success response
        res.status(200).json({ message: "Data added successfully" });
      } catch (error) {
        // Log the error for debugging
        console.error("Error adding data:", error);

        // Send an error response
        res.status(500).json({ message: "Internal server error" });
      }
    });



// Post request for all videos
app.post('/all-videos/addData', async (req, res) => {
  try {
    // Extract data from the request body
    const { title, link } = req.body;
    console.log("API hit from frontend for videos");

    // Create a new video document with the submitted data
    const newVideo = { title, link };

    // Get the current videos in the collection
    const currentVideos = await videosCollection.find().toArray();

    // Insert the new video document at the beginning of the array
    currentVideos.unshift(newVideo);

    // Update the entire collection with the modified array
    await videosCollection.deleteMany({}); // Delete all videos in the collection
    await videosCollection.insertMany(currentVideos); // Insert the modified array

    // Respond with success message
    res.status(201).json({ message: 'Video uploaded successfully!' });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




    // //post all videos
    
    // app.post('/all-videos/addData', async (req, res) => {
    //   try {
    //     // Extract data from the request body
    //     const { title, link } = req.body;
    //     console.log("API hit from frontend from videos");
  
    //     // Insert the video document into the collection
    //     await videosCollection.insertOne({ title, link });
  
    //     // Respond with success message
    //     res.status(201).json({ message: 'Video uploaded successfully!' });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // });




    // get all videos here
    app.get("/all-videos", async (req, res) => {
      try {
        const videosData = await videosCollection.find().toArray();
        res.json(videosData);
      } catch (err) {
        console.error("Error fetching videos:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Testing connection
    app.get("/", (req, res) => {
      res.send("Nobel Bro server jinda hai...");
    });

    // Listening on PORT 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.log("error happened!"));
