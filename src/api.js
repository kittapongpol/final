import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchPosts = () => API.get('/posts');
export const createPost = (postData, token) =>
  API.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const login = (userData) => API.post('/login', userData);
