const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const router = express.Router();
const imageDirectory = require('./js/getImageArrays');
//what does listen do?
app.listen(port);

//mount folders
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/js', express.static(path.join(__dirname, 'js')));

//get requests
app.get('/', (req, res) => {
    let html = fs.readFileSync('./views/index.html')
    res.write(html);
    res.end();
});