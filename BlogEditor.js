import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        });
    }
  }, [id]);

  const handleSave = () => {
    const blogData = { title, content };
    if (id) {
      axios.put(`http://localhost:5000/api/blogs/${id}`, blogData)
        .then(() => history.push("/"));
    } else {
      axios.post("http://localhost:5000/api/blogs", blogData)
        .then(() => history.push("/"));
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Create"} Blog</h1>
      <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Blog Title" 
      />
      <textarea 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="Write your blog content here..." 
      />
      <ReactMarkdown>{content}</ReactMarkdown>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BlogEditor;