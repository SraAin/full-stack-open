import { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const initialValues = {
    title: '',
    author: '',
    url: '',
  };

  const [newBlog, setNewBlog] = useState(initialValues);

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog(initialValues);
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
              id="title"
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleNewBlogChange}
              placeholder="title"
            />
          </div>
          <div>
            Author:
            <input
              id="author"
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleNewBlogChange}
              placeholder="author"
            />
          </div>
          <div>
            Link:
            <input
              id="link"
              type="text"
              name="url"
              value={newBlog.url}
              onChange={handleNewBlogChange}
              placeholder="url"
            />
          </div>
          <button id='submit' type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogForm;
