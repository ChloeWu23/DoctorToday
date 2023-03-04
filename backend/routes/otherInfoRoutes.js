const router = require("express").Router();

const db = require("../app/models");
const OtherInfo = db.OtherInfo;
const Op = db.Sequelize.Op;

router.get("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.info_type === undefined || req.body.info_type === null) {
        OtherInfo.findAll({
            attributes: ['info_type', 'info_content']
        })
        .then(data => {
            console.log(req.body);
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "find all in other info failed"
              });
        });
        return;
    }

    const item = await OtherInfo.findOne({
        where: {
            info_type: req.body.info_type
        }
    });
    if (item === null) {
        OtherInfo.findAll({
            attributes: ['info_type', 'info_content']
        })
        .then(data => {
            res.status(400).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "find all in other info failed"
              });
        });
        return;
    }

    res.status(200).send(item.info_content);
    
});

router.post("/login", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    console.log(req.body);

    if (req.body.username === undefined || req.body.username === null) {
        data = {
            "msg": "No username! "
        }
        res.status(401).json(data);
    }

    const itemUserName = await OtherInfo.findOne({
        where: {
            info_type: "admin-name",
            info_content: req.body.username
        }
    })
    .catch(err => {
        console.log(err);
        res.status(402).json(data);
    });

    const itemUserPassword = await OtherInfo.findOne({
        where: {
            info_type: "admin-password",
            info_content: req.body.password
        }
    })
    .catch(err => {
        console.log(err);
        res.status(403).json(data);
    });

    if (itemUserName === null || itemUserName === undefined || itemUserPassword === null || itemUserPassword === undefined) {
        data = {
            "msg": "Wrong name or password! "
        }
        res.status(405).json(data);
        
    }
    else {
        data = {
            "msg": "Log in successfully! ",
            "user": req.body.username
        }
        res.status(200).json(data);
    }

})


router.post("/", async(req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.info_type === undefined || req.body.info_type === null) {
        res.status(400).send({
            message: "Info type can not be empty!",
          });
        console.log(req.body);
        return;
    }
    
    var newItem = {
        info_type: req.body.info_type,
        info_content: req.body.info_content
    }

    OtherInfo.create(newItem)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the OtherInfo item",
        });
    });
});


module.exports = router;