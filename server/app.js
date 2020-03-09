const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === `production`;
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`/api`, require('./routes'));

if (!isProduction) {
    app.use(errorHandler());
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));