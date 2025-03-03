const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const marked = require("marked");

const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  isPinned: { type: Boolean, default: false },
});

const Blog = mongoose.model("Blog", blogSchema);

// API to create a new blog post
app.post("/api/blogs", async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Error saving the blog" });
  }
});

// API to fetch all blogs (supports Markdown rendering)
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const renderedBlogs = blogs.map(blog => ({
      ...blog.toObject(),
      content: marked(blog.content),
    }));
    res.json(renderedBlogs);
  } catch (err) {
    res.status(400).json({ message: "Error fetching blogs" });
  }
});

// API to pin a blog
app.put("/api/blogs/:id/pin", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    blog.isPinned = !blog.isPinned;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Error pinning blog" });
  }
});

// API to download a blog (JSON format)
app.get("/api/blogs/:id/download", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Error downloading blog" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});