import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ message, color }) => {
  const infoMsgStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={infoMsgStyle}>{message}</div>
  )
}

const App = () => {
  const initialValues = {
    title: '',
    author: '',
    url: '',
  }
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

    setInfoMsgStyle('green')
    setInfoMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setInfoMsg(null);
    }, 5000);
  };

  const handleNewBlogChange = (event) => {
    const value = event.target.value;
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    });
  }

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
      <div>
        <h2>Blogs</h2>
        <Notification message={infoMsg} color={infoMsgStyle} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>

      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input type="text" name="title" value={newBlog.title} onChange={handleNewBlogChange} />
          </div>
          <div>
            Author:
            <input type="text" name="author" value={newBlog.author} onChange={handleNewBlogChange} />
          </div>
          <div>
            Link:
            <input type="text" name="url" value={newBlog.url} onChange={handleNewBlogChange} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default App;
