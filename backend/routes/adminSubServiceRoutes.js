const router = require("express").Router();

const db = require("../app/models");
const SubService = db.SubService;
const Op = db.Sequelize.Op;

router.post("/:cat_id", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    console.log("in post add subservice")
    console.log(req.params.cat_id)

    // INSERT WHERE cat_id = req.params.cat_id
    if (req.body.sub_service_name === null || req.body.sub_service_name === undefined ) {
        res.status(400).send({
            message: "SubService Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    var count = await SubService.count({
        where:  {
            cat_id : req.params.cat_id
        }
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred when count(cat_id)"
        })
    });

    var SubServiceItem = {
        cat_id: req.params.cat_id,
        sub_service_id: count,
        sub_service_name: req.body.sub_service_name,
        description: req.body.description,
        price: req.body.price
    }

    SubService.create(SubServiceItem)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service",
            });
        });

});

router.post("/:cat_id/edit", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.sub_service_id === null || req.body.sub_service_id === undefined ) {
        res.status(400).send({
            message: "SubService Content can not be empty!",
          });
        console.log(req.body);
        return;
    }

    const patchItem = await SubService.findOne({
         where: { 
            cat_id: req.params.cat_id,
            sub_service_id: req.body.sub_service_id 
        } 
    });
    if (patchItem === null) {
        res.status(400).send({
        message: "invalid cat_id & sub_service_id! ",
        });
        return;
    }

    patchItem.set({
        sub_service_name: req.body.sub_service_name,
        description: req.body.description,
        price: req.body.price
    });

    await patchItem
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                  err.message || "Some error occured while updating SubServing",
              });
        });
  
});

router.post("/:cat_id/delete", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.sub_service_id === null || req.body.sub_service_id === undefined) {
        res.status(400).send({
            message: "SubService Content can not be empty!",
          });
        console.log(req.body);
        return;
    }
    
    var count = await SubService.count({
        where:  {
            cat_id : req.params.cat_id
        }
    });

    await SubService.destroy({
        where: {
          cat_id: req.params.cat_id,
          sub_service_id: req.body.sub_service_id
        },
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occured while deleting SubService",
          });
      });

    for (var i = req.body.sub_service_id + 1; i < count ; i++) {
        await SubService.update(
            { sub_service_id: i - 1 },
            {
                where: {
                    cat_id: req.params.cat_id,
                    sub_service_id: i
                },
            }
        );
    }

    res.status(204).json({
        status: "delete success",
        data: null
    });


})

router.patch("/:cat_id/swap", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.id_1 === null || req.body.id_2 === null || req.body.id_1 === undefined || req.body.id_2 === undefined) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      }

    var count = await SubService.count({
        where:  {
            cat_id : req.params.cat_id
        }
    });

    await SubService.update(
        { sub_service_id: count },
        {
            where: {
                cat_id: req.params.cat_id,
                sub_service_id: req.body.id_1
            }
        }
    );

    await SubService.update(
        { sub_service_id: req.body.id_1 },
        {
            where: {
                cat_id: req.params.cat_id,
                sub_service_id: req.body.id_2
            }
        }
    );

    await SubService.update(
        { sub_service_id: req.body.id_2 },
        {
            where: {
                cat_id: req.params.cat_id,
                sub_service_id: count
            }
        }
    );

    res.status(200).json({
        status: "success",
        data: null,
    });
    
});

module.exports = router;