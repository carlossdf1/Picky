const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    console.log(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', (req, res) => {
    console.log(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/img", express.static(path.resolve(__dirname, "", "img")));
app.use("/css", express.static(path.resolve(__dirname, "", "css")));
app.use("/js", express.static(path.resolve(__dirname, "", "js")));
// app.use("/svg", express.static(path.resolve(__dirname, "", "svg")));

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});