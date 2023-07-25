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

  const updateBlog = (id, updatedBlog) => {
    /*setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs];
      updatedBlogs[id] = updatedBlog;
      return updatedBlogs;
    });*/
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
      <Togglable ref={blogFormRef}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          blogFormRef={blogFormRef}
          setInfoMsgStyle={setInfoMsgStyle}
          setInfoMsg={setInfoMsg}
        />
      </Togglable>
    </div>
  );
};

export default App;
