const router = require("express").Router();

const db = require("../app/models");
const DisableTime = db.DisableTime;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    DisableTime.findAll()
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Some error occurred while retriving disable time slot data"
        });
      });
    
})

router.post("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.start_time === null || req.body.end_time === null || req.body.start_time === undefined || req.body.end_time === undefined) {
        res.status(400).send({
            message: "DisableTime Content can not be empty!",
          });
        console.log(req.body);
        return;
    }
    
    var disableTimeItem = {
        start_time: req.body.start_time,
        end_time: req.body.end_time
    }

    DisableTime.create(disableTimeItem)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the disableTime item",
        });
    });
});

router.delete("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.slot_id === null || req.body.slot_id === undefined) {
        res.status(400).send({
            message: "disableTime Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    await DisableTime.destroy({
        where: {
          id: req.body.slot_id
        },
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occured while deleting disableTime",
          });
      });

    res.status(204).json({
        status: "delete success",
        data: null
    });

})

module.exports = router;