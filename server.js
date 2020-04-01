const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use('/api', createProxyMiddleware({ target: dev ? 'http://localhost:3001' : 'http://thebork.ru:3001', changeOrigin: true }));
    server.use('/uploads', createProxyMiddleware({ target: dev ? 'http://localhost:3001' : 'http://thebork.ru:3001', changeOrigin: true }));

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});