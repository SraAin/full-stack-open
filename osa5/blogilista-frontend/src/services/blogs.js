import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (newBlogObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlogObj, config);
  return response.data;
};

const updateBlog = async (id, blogObj) => {
  const request = await axios.put(`${baseUrl}/${id}`, blogObj);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
