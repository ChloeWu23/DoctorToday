const router = require("express").Router();

const db = require("../app/models");
const FAQ = db.FAQ;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    FAQ.findAll({
        order: ["faq_id"]
    })
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Some error occurred while retriving FAQ data"
        });
      });
});


router.post("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.question === null || req.body.question === undefined) {
        res.status(400).send({
            message: "FAQ Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    var count = await FAQ.count()
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred when count(FAQ)"
        })
    });

    
    var newItem = {
        faq_id: count,
        question: req.body.question,
        answer: req.body.answer
    }

    FAQ.create(newItem)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the FAQ item",
        });
    });
});

router.patch("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.faq_id === null || req.body.faq_id === undefined ) {
        res.status(400).send({
            message: "FAQ Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    const patchItem = await FAQ.findByPk(req.body.faq_id);
    if (patchItem === null) {
        res.status(400).send({
        message: "invalid faq_id! ",
        });
        return;
    }

    patchItem.set({
        question: req.body.question,
        answer: req.body.answer
    });

    await patchItem
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                  err.message || "Some error occured while updating FAQs",
              });
        });
});

router.delete("/", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
  
    if (req.body.faq_id == null || req.body.faq_id == undefined) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      console.log(req.body);
      return;
    }
  
    var count = await FAQ.count({ col: "faq_id" });
  
    await FAQ.destroy({
      where: {
        faq_id: req.body.faq_id
      },
    });

    for (var i = req.body.faq_id + 1; i <= count; i++) {
        // console.log("-- delete row " + i);
        await FAQ.update(
          { faq_id: i - 1 },
          {
            where: {
              faq_id: i,
            },
          }
        );
    }

    res.status(204).json({
    status: "success",
    data: null,
    });
});

router.patch("/swap", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    // console.log(req.body);
  
    if (req.body.id_1 === null || req.body.id_2 === null || req.body.id_1 === undefined || req.body.id_2 === undefined) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    var count = await FAQ.count({ col: "faq_id" });
  
    await FAQ.update(
      { faq_id: count },
      {
        where: {
          faq_id: req.body.id_1,
        },
      }
    );
  
    await FAQ.update(
      { faq_id: req.body.id_1 },
      {
        where: {
          faq_id: req.body.id_2,
        },
      }
    );
  
    await FAQ.update(
      { faq_id: req.body.id_2 },
      {
        where: {
          faq_id: count,
        },
      }
    );
  
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
  


module.exports = router;