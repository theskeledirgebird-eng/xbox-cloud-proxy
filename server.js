const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', createProxyMiddleware({
    target: 'https://xbox.com',
    changeOrigin: true,
    autoRewrite: true, // Fixes the blank white screen by rewriting internal redirect links
    onProxyRes: function (proxyRes, req, res) {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy live on port ${PORT}`);
});
