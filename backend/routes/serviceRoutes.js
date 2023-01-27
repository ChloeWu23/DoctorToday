const router = require("express").Router();


const db = require("../app/models");
const ServiceOverviews = db.ServiceOverviews;
const Op = db.Sequelize.Op;


router.get('/', (req, res) => {
  // const fs = require('fs');
  // const data = JSON.parse(
  //   fs.readFileSync('./config-data/data.json')
  // );
  // console.log(data);

  ServiceOverviews.findAll({
    order: ["service_cat_id"]
  })
  .then(data => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while retriving service data"
    });
  });
  
});
    

module.exports = router;