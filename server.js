const express = require('express');
const bodyParser = require('body-parser');
const emailSender = require('./src/index');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/send-email', emailSender);

app.listen(port, () => {
    console.log('Server is running on port 3000');
});
