const multer = require("multer");
const router = require("express").Router();
const path = require("path");
const multerS3 = require("multer-s3");
const { S3Client,DeleteObjectCommand } = require("@aws-sdk/client-s3");

/*
    post("/")  : add new service, need serviceName
    patch("/:service_cat_id ") : update current service, need service_cat_id
    delete("/:service_cat_id ") : delete service, need service_cat_id
    patch("/swap") : swap two service, need req.body.id_1 && req.body.id_2
*/

const db = require("../app/models");
const ServiceOverviews = db.ServiceOverviews;
const SubService = db.SubService;
const Op = db.Sequelize.Op;

/**
 * POST
 * /upload
 * */
let s3 = new S3Client({
  region: "eu-west-2",
  credentials: {
    accessKeyId: "AKIARXAT7U35FUQT3NUL",
    secretAccessKey: "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",
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const S3_BUCKET_NAME = "upload-image-for-admin";

// // Set up Multer S3 middleware for image upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "service/" + Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.post("/", upload.single("file"), async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  var file = req.file;
  console.log("in uploadServiceRoute");
  console.log(file);
  console.log(file.location);

  if (req.body.serviceName === null || req.body.serviceName === undefined) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  var count = await ServiceOverviews.count({ col: "serviceName" });
  var bind_max = await ServiceOverviews.max("bind_id");
  var serviceItem = {
    serviceName: req.body.serviceName,
    bind_id: bind_max + 1,
    service_cat_id: count,
    description_1: req.body.description_1,
    description_2: req.body.description_2,
    description_3: req.body.description_3,
    image: file.location,
    appointment_iframe: req.body.appointment_iframe,
  };

  ServiceOverviews.create(serviceItem)
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

// found the service by service_cat_id
router.patch("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (
    req.body.service_cat_id === null ||
    req.body.service_cat_id === undefined
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  const patchItem = await ServiceOverviews.findOne({
    where: { service_cat_id: req.body.service_cat_id },
  });
  if (patchItem === null) {
    res.status(400).send({
      message: "invalid service_cat_id! ",
    });
    return;
  }

  patchItem.set({
    serviceName: req.body.serviceName,
    description_1: req.body.description_1,
    description_2: req.body.description_2,
    description_3: req.body.description_3,
    image: req.body.image,
    appointment_iframe: req.body.appointment_iframe,
  });

  await patchItem
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while updating ServiceOverview",
      });
    });
});

//updateAws and database
router.post("/updateAws", upload.single("file"), async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  var file = req.file;
  console.log("in adminroutes updateAws");
  console.log(file);
  console.log(file.location);

  const objectKey = req.body.objectKey
  console.log('in backend' + objectKey)
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: objectKey,
  };

  if (
    req.body.service_cat_id === null ||
    req.body.service_cat_id === undefined
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  const patchItem = await ServiceOverviews.findOne({
    where: { service_cat_id: req.body.service_cat_id },
  });
  if (patchItem === null) {
    res.status(400).send({
      message: "invalid service_cat_id! ",
    });
    return;
  }

  patchItem.set({
    serviceName: req.body.serviceName,
    description_1: req.body.description_1,
    description_2: req.body.description_2,
    description_3: req.body.description_3,
    image: file.location,
    appointment_iframe: req.body.appointment_iframe,
  });

  await patchItem
    .save()
    .then((data) => {
      //if update database success, then delete from aws
      s3.send(new DeleteObjectCommand(params))
        .then(() => {
          console.log(
            `Object with key ${OBJECT_KEY} was deleted from bucket ${S3_BUCKET_NAME}`
          );
        })
        .catch((err) => {
          console.log(`Error deleting object: ${err}`);
        });

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while updating ServiceOverview",
      });
    });
});

// delete by service_cat_id
router.post("/deleteService", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (
    req.body.service_cat_id === null ||
    req.body.service_cat_id === undefined
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  var count = await ServiceOverviews.count({ col: "service_cat_id" });

  // console.log("original rows size: " + count);
  // var bind_id;
  // const item = ServiceOverviews.findOne({
  //   attributes: ["bind_id"],
  //   where: {
  //     service_cat_id: req.body.service_cat_id
  //   }
  // })
  //   .then(data => {
  //     bind_id = data.bind_id;
  //     console.log("--- find " + data.bind_id);

  //   })
  //   .catch(err => {
  //     res.status(501).send(err.message);
  //   })

  await ServiceOverviews.destroy({
    where: {
      service_cat_id: req.body.service_cat_id,
    },
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occured while deleting Service",
    });
  });

  // for service_cat_id = [target+1 : count-1], primary_key--
  for (var i = req.body.service_cat_id + 1; i < count; i++) {
    // console.log("-- delete row " + i);
    await ServiceOverviews.update(
      { service_cat_id: i - 1 },
      {
        where: {
          service_cat_id: i,
        },
      }
    ).catch((err) => {
      res.status(500).send({
        message: err.message || "ERROR in deleting subsequent news",
      });
    });
  }

  // delete all subService
  // console.log("--- bind_id: " + bind_id);
  // await SubService.destroy({
  //   where: {
  //     cat_id: bind_id
  //   }
  // })
  //   .then(data => {
  //     console.log("--- delete subservice size: " + data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occured while deleSubServiceting ",
  //     });
  //   })

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// found the service by id_1 / id_2
router.patch("/swap", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);

  if (
    req.body.id_1 === undefined ||
    req.body.id_2 === undefined ||
    req.body.id_1 === null ||
    req.body.id_2 === null
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var count = await ServiceOverviews.count({ col: "service_cat_id" });

  await ServiceOverviews.update(
    { service_cat_id: count },
    {
      // id_1 -> count
      where: {
        service_cat_id: req.body.id_1,
      },
    }
  );

  await ServiceOverviews.update(
    { service_cat_id: req.body.id_1 },
    {
      // id_2 -> id_1
      where: {
        service_cat_id: req.body.id_2,
      },
    }
  );

  await ServiceOverviews.update(
    { service_cat_id: req.body.id_2 },
    {
      // count -> id_2
      where: {
        service_cat_id: count,
      },
    }
  );

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = router;
