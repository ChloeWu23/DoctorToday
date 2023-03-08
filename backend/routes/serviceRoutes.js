const router = require("express").Router();


const db = require("../app/models");
const ServiceOverviews = db.ServiceOverviews;
const SubService = db.SubService;
const Op = db.Sequelize.Op;

// get all service data
router.get('/', (req, res) => {
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

// get one serviceSummary data
router.get('/getOne/:service_cat_id', (req, res) => {
  ServiceOverviews.findOne({
    where: {
      service_cat_id: req.params.service_cat_id
    }
  })
  .then(data => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while retriving one service data"
    });
  });
});

// get all sub-service with cat_id
router.get('/:cat_id', (req, res) => {
  SubService.findAll({
    where: {
      cat_id : req.params.cat_id
    },
    order: ["sub_service_id"]
  })
  .then(data => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while retriving SubService data"
    });
  });

})
    

module.exports = router;