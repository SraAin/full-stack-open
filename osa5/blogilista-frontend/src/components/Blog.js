import { useState } from 'react';

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false);

  const showWhenBlogVisible = { display: blogInfoVisible ? '' : 'none' };
  const hideWhenBlogVisible = { display: blogInfoVisible ? 'none' : '' };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        <p>{blog.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
