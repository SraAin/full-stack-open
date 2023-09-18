import { useState, useEffect } from 'react';

const Blog = ({ blog, user, handleBlogUpdate, handleBlogDelete }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false);
  const [deleteBtnVisible, setDeleteBtnVisible] = useState(false);

  const showWhenBlogVisible = { display: blogInfoVisible ? '' : 'none' };
  const hideWhenBlogVisible = { display: blogInfoVisible ? 'none' : '' };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    const updatedBlog = { ...blog, likes: ++blog.likes };
    handleBlogUpdate(blog.id, updatedBlog);
  };

  useEffect(() => {
    if (user) {
      if (user === blog.user.username) {
        setDeleteBtnVisible(true);
      }
    }
  }, [user, blog]);

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} BY {blog.author}
        <br></br>
        <button
          id="view"
          style={hideWhenBlogVisible}
          onClick={() => setBlogInfoVisible(true)}
        >
          View
        </button>
      </div>
      <div style={showWhenBlogVisible}>
        <div>
          <p>
            <button onClick={() => setBlogInfoVisible(false)}>Hide</button>
          </p>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={addLike} id="like" className='like'>
            Like
          </button>
          <p>{blog.user.name}</p>
          {deleteBtnVisible && (
            <button
              style={{ backgroundColor: 'lightblue' }}
              onClick={() => handleBlogDelete(blog.id)}
              id="deleteButton"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
