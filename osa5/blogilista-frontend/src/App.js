import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [infoMsgStyle, setInfoMsgStyle] = useState({});

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setInfoMsgStyle('red');
      setInfoMsg('wrong username or password');
      setTimeout(() => {
        setInfoMsg(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
    console.log('user logged out');
  };

  const handleBlogUpdate = (id, updatedBlog) => {
    blogService.updateBlog(id, updatedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
    //setBlogs(newBlogArr.sort((a, b) => b.likes - a.likes));
  };

  const handleBlogDelete = (deletedBlog) => {
    try {
      if (window.confirm('Remove blog')) {
        blogService.deleteBlog(deletedBlog);
        const updatedBlogArr = blogs.filter((blog) => blog.id !== deletedBlog);
        setBlogs(updatedBlogArr);
        setInfoMsgStyle('green');
        setInfoMsg('Blog deleted succesfully');
        setTimeout(() => {
          setInfoMsg(null);
        }, 5000);
      }
    } catch (error) {
      setInfoMsgStyle('green');
      setInfoMsg('Blog delete failed');
      setTimeout(() => {
        setInfoMsg(null);
      }, 5000);
    }
  };

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();

      const returnedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(returnedBlog));

      setInfoMsgStyle('green');
      setInfoMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setInfoMsg(null);
      }, 5000);
    } catch (error) {
      setInfoMsgStyle('red');
      setInfoMsg('Blog title or url is shorter than minimum allowed lenght');
      setTimeout(() => {
        setInfoMsg(null);
      }, 10000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={infoMsg} color={infoMsgStyle} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={infoMsg} color={infoMsgStyle} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogUpdate={handleBlogUpdate}
          handleBlogDelete={handleBlogDelete}
          user={user.username}
        />
      ))}
      <Togglable ref={blogFormRef} buttonLabel={'New Blog'}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          blogFormRef={blogFormRef}
          createBlog={createBlog}
        />
      </Togglable>
    </div>
  );
};

export default App;
