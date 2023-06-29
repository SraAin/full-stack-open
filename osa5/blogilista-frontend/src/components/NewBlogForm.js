const NewBlogForm = ({
    addBlog,
    newBlog,
    handleNewBlogChange,
  }) => {

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

  export default NewBlogForm