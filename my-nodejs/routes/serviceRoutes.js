const router = require("express").Router();

const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./config-data/data.json')
);


router.get('/', (req, res) => {
        console.log(data);
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    })
    

module.exports = router;