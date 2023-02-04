const router = require("express").Router();

const db = require("../app/models");
const DisableTime = db.DisableTime;
const Holiday = db.Holiday;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.date == null || req.body.date == undefined) {
      res.status(500).send({
        message: "request data should include 'date', will return disable slot "
      })
    }

    const disableTimeSlot = await DisableTime.findAll({
      attributes: ["start_time", "end_time"],
      where: {
        date: req.body.date
      }
    });
    
    const item = await Holiday.findOne({
      where: {
        date: req.body.date
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "ERROR"
      })
    });

    if (item != null) {
      const data = {
        "start_time": null,
        "end_time": null
      }
      res.status(200).json(data);
    }
    else {
      res.status(200).json(disableTimeSlot);
    }
    
})

router.post("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.date === null || req.body.date === undefined) {
        res.status(400).send({
            message: "DisableTime Content can not be empty!",
          });
        console.log(req.body);
        return;
    }
    
    var disableTimeItem = {
      date: req.body.date,
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

    if (req.body.id === null || req.body.id === undefined) {
        res.status(400).send({
            message: "disableTime Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    await DisableTime.destroy({
        where: {
          id: req.body.id
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

router.get("/holiday", async(req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  Holiday.findAll({
    attributes: ["id", "name", "date"],
    order: ["id"]
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "error"
    });
  });

})

router.post("/holiday", async(req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

    if (req.body.date === null || req.body.date === undefined) {
        res.status(400).send({
            message: "Holiday date Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    var newItem = {
      name: req.body.name,
      date: req.body.date
    }

    Holiday.create(newItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
                err.message || "Some error occurred while creating the Holiday item",
      });
    });
})

router.delete("/holiday", async(req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  
  if (req.body.id == null || req.body.id == undefined) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  await Holiday.destroy({
    where: {
      id: req.body.id
    },
  });

  res.status(204).json({
    status: "success",
    data: null,
    });
  
})

module.exports = router;