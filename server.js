const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const api = require('./server/routes/api');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', api);

const port = '3002';

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
