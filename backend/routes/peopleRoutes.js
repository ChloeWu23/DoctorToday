const router = require("express").Router();
const multer = require('multer')
const multerS3 = require('multer-s3');
const path = require('path');

const { Sequelize } = require("../app/models");
const db = require("../app/models");
const People = db.People;
const Op = db.Sequelize.Op;

const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: 'AKIARXAT7U35FUQT3NUL',
    secretAccessKey: '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',
    region: 'eu-west-2',
  });

const s3 = new aws.S3();
const S3_BUCKET_NAME = 'upload-image-for-admin';

// Set up Multer S3 middleware for image upload
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, 'peopleImage/' + Date.now().toString() + '-' + file.originalname);
      }
    })
  });



// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '')//../../frontend/assets/people
//         console.log('in destination')
//     },
//     filename: function (req, file, cb) {
//         //use current time to set name of files
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })


// var upload = multer({
//     storage: storage
// })

router.get("/", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    People.findAll({
        order: ["staff_id"]
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

router.post("/", upload.single('file'),
    async (req, res) => {
        res.set("Access-Control-Allow-Origin", "*");

        var file = req.file
        console.log("in uploadRoutes")
        console.log(file)
        console.log(file.destination)
        //res.send(file)


        if (req.body.name === null || req.body.name === undefined) {
            res.status(500).send({
                message: "req should include staff name"
            })
            console.log(req.body);
            return;
        }

        var count = await People.count()
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred when count(People)"
                })
            });

        // var pathToRead = 'people/' + file.filename
        // console.log('path to read:')
        // console.log(pathToRead)

        var newItem = {
            staff_id: count,
            name: req.body.name,
            title: req.body.title,
            profile: req.body.profile,
            description: req.body.description,
            image: "",//pathToRead,
            website: req.body.website,
            is_independent: req.body.is_independent
        }

        People.create(newItem)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "error when add People"
                });
            });
    });

router.patch("/", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.staff_id === null || req.body.staff_id === null) {
        res.status(400).send({
            message: "Poeple id can not be empty!",
        });
        console.log(req.body);
        return;
    }

    const patchItem = await People.findOne({
        where: {
            staff_id: req.body.staff_id
        }
    });
    if (patchItem === null) {
        res.status(400).send({
            message: "invalid staff_id! ",
        });
        return;
    }

    patchItem.set({
        name: req.body.name,
        title: req.body.title,
        profile: req.body.profile,
        description: req.body.description,
        image: req.body.image,
        website: req.body.website,
        is_independent: req.body.is_independent
    });

    await patchItem
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while updating People",
            });
        });
});

router.post("/delete", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.body.staff_id === null || req.body.staff_id === undefined) {
        res.status(400).send({
            message: "staff Content can not be empty!",
        });
        console.log(req.body);
        return;
    }

    var count = await People.count();

    await People.destroy({
        where: {
            staff_id: req.body.staff_id
        }
    })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while deleting People",
            });
        });

    for (var i = req.body.staff_id + 1; i < count; i++) {
        await People.update(
            { staff_id: i - 1 },
            {
                where: {
                    staff_id: i
                },
            }
        );
    }

    res.status(204).json({
        status: "delete success",
        data: req.body.staff_id
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

    var count = await People.count();

    await People.update(
        { staff_id: count },
        {
            where: {
                staff_id: req.body.id_1
            }
        }
    );

    await People.update(
        { staff_id: req.body.id_1 },
        {
            where: {
                staff_id: req.body.id_2
            }
        }
    );

    await People.update(
        { staff_id: req.body.id_2 },
        {
            where: {
                staff_id: count
            }
        }
    );

    res.status(200).json({
        status: "success",
        data: [req.body.id_1, req.body.id_2],
    });

});

module.exports = router;