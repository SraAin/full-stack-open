import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const initialValues = {
    title: '',
    author: '',
    url: '',
  };

  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(initialValues);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [infoMsgStyle, setInfoMsgStyle] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef()

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
    } catch {
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

  const addBlog = (event) => {
    event.preventDefault();

    blogService.createBlog(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    blogFormRef.current.toggleVisibility()

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
        <Blog key={blog.id} blog={blog} />
      ))}
      <Togglable ref={blogFormRef}>
        <NewBlogForm
          infoMsg={infoMsg}
          infoMsgStyle={infoMsgStyle}
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          addBlog={addBlog}
          newBlog={newBlog}
          handleNewBlogChange={handleNewBlogChange}
        />
      </Togglable>
    </div>
  );
};

export default App;
