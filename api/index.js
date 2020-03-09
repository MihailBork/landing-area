import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';

export const api = axios.create({
    baseURL: dev ? `http://localhost:3001` : `http://ayta.thebork.ru:3001`,
});