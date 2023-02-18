const router = require("express").Router();

const db = require("../app/models");
const News = db.News;
const Op = db.Sequelize.Op;

router.get("", (req, res) => {
    News.findAll({
        order: ["news_id"]
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
})

router.post("", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.title === null || req.body.title === undefined ) {
        res.status(400).send({
            message: "News Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    var id_max = await News.max("news_id")
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred when get max(news_id)"
        })
    });

    var newItem = {
        news_id: id_max + 1,
        title: req.body.title,
        content: req.body.content
    }

    News.create(newItem)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the News",
            });
        });
});

router.post("/delete", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.news_id === null || req.body.news_id === undefined) {
        res.status(400).send({
            message: "News Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    await News.destroy({
        where: {
          news_id: req.body.news_id
        },
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occured while deleting News",
          });
      });

    res.status(204).json({
        status: "delete success",
        data: null
    });
})

router.patch("/swap", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.id_1 === null || req.body.id_2 === null || req.body.id_1 === undefined || req.body.id_2 === undefined) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      }

    const tmp = -1;

    await News.update(
        { news_id: tmp },
        {
            where: {
                news_id: req.body.id_1
            }
        }
    );

    await News.update(
        { news_id: req.body.id_1 },
        {
            where: {
                news_id: req.body.id_2
            }
        }
    );

    await News.update(
        { news_id: req.body.id_2 },
        {
            where: {
                news_id: tmp
            }
        }
    );

    res.status(200).json({
        status: "success",
        data: null,
    });
    
});

module.exports = router;