const router = require("express").Router();

const db = require("../app/models");
const Travel = db.Travel;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    Travel.findAll({
        order: ["country_id"]
    })
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Some error occurred while retriving Travel data"
        });
      });
});

// router.post("/", async(req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");

//     if (req.body.data === null || req.body.data === undefined) {
//         res.status(400).send({
//             message: "Travel Content can not be empty!",
//           });
//         console.log(req.body);
//         return;
//     }


//     for (let i = 0 ; i < req.body.data.length ; i++ ){
//         var newItem = {
//             country_id: req.body.data[i].country_id,
//             name: req.body.data[i].name,
//             path: req.body.data[i].path
//         }
//         Travel.create(newItem)
//         .catch((err) => {
//             console.log("ERROT: at " + i);
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the travel item",
//             });
//             return;
//         });
//     }

//     res.status(200).json({
//         status: "success",
//         data: req.body.data.length,
//       });

    
    
// });


module.exports = router;