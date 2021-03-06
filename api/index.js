import axios from 'axios';

const dev = process.env.NODE_ENV !== `production`;

const api = axios.create({
  baseURL: dev ? `http://localhost:3001/api` : `http://thebork.ru:3001/api`,
});

export default api;
