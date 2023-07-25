import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false);

  const showWhenBlogVisible = { display: blogInfoVisible ? '' : 'none' };
  const hideWhenBlogVisible = { display: blogInfoVisible ? 'none' : '' };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = (event) => {
    event.preventDefault();

    const updatedBlog = { ...blog, likes: ++blog.likes };
    blogService.updateBlog(blog.id, updatedBlog).then((returnedBlog) => {
      updateBlog(returnedBlog.id, returnedBlog);
    });
  };

  return (
    <div>
      <div style={hideWhenBlogVisible}>
        <div style={blogStyle}>
          {blog.title} BY {blog.author}
          <button onClick={() => setBlogInfoVisible(true)}>View</button>
        </div>
      </div>
      <div style={showWhenBlogVisible}>
        <div style={blogStyle}>
          <p>
            {blog.title} BY {blog.author}{' '}
            <button onClick={() => setBlogInfoVisible(false)}>Hide</button>
          </p>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={addLike}>Like</button>
          <p>{blog.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
