import { useState } from 'react';

import blogService from '../services/blogs';

const NewBlogForm = ({
  setBlogs,
  blogs,
  blogFormRef,
  setInfoMsgStyle,
  setInfoMsg,
}) => {
  const initialValues = {
    title: '',
    author: '',
    url: '',
  };

  const [newBlog, setNewBlog] = useState(initialValues);

  const addBlog = (event) => {
    event.preventDefault();

    blogService.createBlog(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    blogFormRef.current.toggleVisibility();

    setInfoMsgStyle('green');
    setInfoMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setInfoMsg(null);
    }, 5000);
  };

  const handleNewBlogChange = (event) => {
    const value = event.target.value;
    setNewBlog({
      ...newBlog,
      [event.target.name]: value,
    });
  };

  return (
    <div>
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleNewBlogChange}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleNewBlogChange}
            />
          </div>
          <div>
            Link:
            <input
              type="text"
              name="url"
              value={newBlog.url}
              onChange={handleNewBlogChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogForm;
