import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching blogs!", error);
      });
  }, []);

  const handlePin = (id) => {
    axios.put(`http://localhost:5000/api/blogs/${id}/pin`)
      .then(response => {
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => blog._id === id ? response.data : blog)
        );
      });
  };

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-post">
          <h2>{blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <button onClick={() => handlePin(blog._id)}>
            {blog.isPinned ? "Unpin" : "Pin"}
          </button>
          <Link to={`/edit/${blog._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;