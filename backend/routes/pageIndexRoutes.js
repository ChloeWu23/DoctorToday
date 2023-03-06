const router = require("express").Router();

const db = require("../app/models");
const PageIndex = db.PageIndex;

// you can get all data by "/page-index" and one data by "/page-index/:id"
router.get("/", async(req, res) => {
    PageIndex.findAll({
        order: ["id"]
        })
        .then(data => {
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
            message: 
                err.message || "Some error occurred while retriving page index data"
            });
        });
});

router.get("/:id", async(req, res) => {
    PageIndex.findOne({
        where: {
            id: req.params.id
        }
        })
        .then(data => {
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
            message: 
                err.message || "Some error occurred while retriving page data with id"
            });
        });
});

router.post("/", async(req, res) => {
    if (req.body.page_title === null || req.body.page_title === undefined) {
        res.status(400).send({
            message: "page_title can not be empty!",
          });
        console.log(req.body);
        return;
    }

    var id_max = await PageIndex.max()
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred when count(pageIndex)"
        })
    });

    
    var newItem = {
        id: id_max + 1,
        page_title: req.body.page_title,
        url: req.body.url
    }

    PageIndex.create(newItem)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the PageIndex item",
        });
    });
});

router.post("/delete", async (req, res) => {
    if (req.body.id == null || req.body.id == undefined) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      console.log(req.body);
      return;
    }
  
    await PageIndex.destroy({
      where: {
        id: req.body.id
      },
    });

    res.status(204).json({
    status: "success",
    data: null,
    });
});

module.exports = router;