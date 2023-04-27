const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    username: 'testi',
    name: 'testi testi',
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

describe('when new user is created', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUsers);
  });
  test('fails with status code 400 if password is invalid', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'Lola',
      name: 'Lola Testi',
      password: 'lo',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password is too short');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test('fails with status code 400 if username is invalid', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'Lo',
      name: 'Lola Testi',
      password: 'lola',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username is too short');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
