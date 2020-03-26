/** @format */
require('dotenv-safe').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth/auth-router');
const server = express();
server.use(cors());
server.use(helmet());
server.use(cookieParser());
server.use(express.json());

server.get('/', (req, res) => {
	res.send('API is up and running');
});

server.use('/api', authRouter);

server.use((req, res) => {
	res.status(404).json({ message: '404 page not found' });
});

server.use((err, req, res, next) => {
	res.status(500).json({ message: 'internal server error' });
});

module.exports = server;
