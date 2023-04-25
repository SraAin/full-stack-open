const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const blog = require('../models/blog');

const api = supertest(app);

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(blogs[0]);
  await blogObj.save();
  blogObj = new Blog(blogs[1]);
  await blogObj.save();
  blogObj = new Blog(blogs[2]);
  await blogObj.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

test('has a field called id', async () => {
  const response = await api.get('/api/blogs');
  const id = response.body.map((res) => res.id);

  expect(id).toBeDefined();
});

test('new blog can be added to db', async () => {
  const newBlog = {
    title: 'How to Build a REST API with Express and Mongoose',
    author: 'Abdurrahman Fadhil',
    url: 'https://rahmanfadhil.com/express-rest-api/',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titleContent = response.body.map((res) => res.title);

  expect(response.body).toHaveLength(blogs.length + 1);
  expect(titleContent).toContain(
    'How to Build a REST API with Express and Mongoose'
  );
});

test('likes has a value of 0', async () => {
  const newBlog = {
    title: 'How to Build a REST API with Express and Mongoose',
    author: 'Abdurrahman Fadhil',
    url: 'https://rahmanfadhil.com/express-rest-api/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogId = response.body.map((res) => res.id);
  const blogToView = blogId[3];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body.likes).toEqual(0);
});

test('blog without title or url is not added to db', async () => {
  const newBlog = {
    title: 'How to Build a REST API with Express and Mongoose',
    author: 'Abdurrahman Fadhil',
    likes: 5,
  };

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

test('deletion of a blog was succesful', async () => {
  const response = await api.get('/api/blogs');
  const currentBlogs = response.body.map(r => r);
  const blogToDelete = currentBlogs[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const resAfterDel = await api.get('/api/blogs');
  const blogsAfterDel = resAfterDel.body.map(r => r.title);
  
  expect(blogsAfterDel).toHaveLength(blogs.length - 1);
  expect(blogsAfterDel).not.toContain(blogToDelete.title)
});

afterAll(async () => {
  await mongoose.connection.close();
});
