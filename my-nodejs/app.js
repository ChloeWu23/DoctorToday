const express = require("express");
const app = express();
const cors = require("cors");

// var config = require('./data.json');
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`)
);


app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(data)
})

app.use(require('cors'));
var corsOptions = {
    origin: "http://localhost:8081/"
  };
app.use(cors(corsOptions));


// app.use(express.json());

// const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});
