require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const api = require('../services');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(api);

module.exports = server;