const router = require("express").Router();

const db = require("../app/models");
const OpeningHours = db.OpeningHours;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    OpeningHours.findAll({
        attributes: ["day", "start_time", "end_time", "disable_time_start", "disable_time_end"],
        order: ["day"]
    })
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Some error occurred while retriving opening hours data"
        });
      });
});

router.get("/:day", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.params.day < 1 || req.params.day > 7) {
        res.status(500).send({
            message: "The day (OpeningHours) should be 1-7 "
        })
    }

    OpeningHours.findByPk(req.params.day)
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Some error occurred while retriving opening hours data"
        });
      });
});

router.post("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.day === null || req.body.day === undefined) {
        res.status(400).send({
            message: "Opening hours Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    if (req.body.day < 1 || req.body.day > 7) {
        res.status(400).send({
            message: "Opening hours day should be 1-7!",
          });
        console.log(req.body);
        return;
    }
    
    var newItem = {
        day: req.body.day,
        start_time: (req.body.start_time) ? req.body.start_time : null,
        end_time: (req.body.end_time)? req.body.end_time : null,
        disable_time_start: (req.body.disable_time_start)? req.body.disable_time_start : null,
        disable_time_end: (req.body.disable_time_end)? req.body.disable_time_end : null
    }

    OpeningHours.create(newItem)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the OpeningHours item",
        });
    });
});

router.patch("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.day === null || req.body.day === undefined) {
        res.status(400).send({
            message: "Opening hours day can not be empty!",
          });
        console.log(req.body);
        return;
    }

    const item = await OpeningHours.findOne({
        where: {
            day: req.body.day
        }
    });
    if (item === null) {
        res.status(400).send({
            message: "Invalid day for OpeningHours!",
          });
        console.log(req.body);
        return;
    }

    item.set({
        day: req.body.day,
        start_time: (req.body.start_time) ? req.body.start_time : null,
        end_time: (req.body.end_time)? req.body.end_time : null,
        disable_time_start: (req.body.disable_time_start)? req.body.disable_time_start : null,
        disable_time_end: (req.body.disable_time_end)? req.body.disable_time_end : null
    });

    await item
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                  err.message || "Some error occured while updating OpeningHours",
              });
        });

});

module.exports = router;