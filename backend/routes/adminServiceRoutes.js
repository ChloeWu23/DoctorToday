const multer = require('multer')
const router = require("express").Router();
const path = require('path');

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
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend-user/src/assets/services')
    console.log('in destination')
  },
  filename: function (req, file, cb) {
    //use current time to set name of files
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({
  storage: storage
})


router.post("/", upload.single('file'),
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    var file = req.file
    console.log("in uploadRoutes")
    console.log(file)
    console.log(file.destination)
    //res.send(file)

    if (req.body.serviceName === null || req.body.serviceName === undefined) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      console.log(req.body);
      return;
    }

    var count = await ServiceOverviews.count({ col: "serviceName" });
    var bind_max = await ServiceOverviews.max("bind_id");
    var pathToRead = 'services/'+file.filename
    console.log('path to read:')
    console.log(pathToRead)
    var serviceItem = {
      serviceName: req.body.serviceName,
      bind_id: bind_max + 1,
      service_cat_id: count,
      description_1: req.body.description_1,
      description_2: req.body.description_2,
      description_3: req.body.description_3,
      image: pathToRead,
      appointment_iframe: req.body.appointment_iframe
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

  if (req.body.service_cat_id === null || req.body.service_cat_id === undefined) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  const patchItem = await ServiceOverviews.findOne(req.body.service_cat_id);
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
    appointment_iframe: req.body.appointment_iframe
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

// delete by service_cat_id
router.post("/deleteService", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.body.service_cat_id === null || req.body.service_cat_id === undefined) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }

  var count = await ServiceOverviews.count({ col: "service_cat_id" });

  // console.log("original rows size: " + count);
  var bind_id;
  const item = ServiceOverviews.findOne({
    attributes: ["bind_id"],
    where: {
      service_cat_id: req.body.service_cat_id
    }
  })
    .then(data => {
      bind_id = data.bind_id;
      console.log("--- find " + data.bind_id);

    })
    .catch(err => {
      res.status(501).send(err.message);
    })

  await ServiceOverviews.destroy({
    where: {
      service_cat_id: req.body.service_cat_id,
    },
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
    );
  }

  // delete all subService
  console.log("--- bind_id: " + bind_id);
  await SubService.destroy({
    where: {
      cat_id: bind_id
    }
  })
    .then(data => {
      console.log("--- delete subservice size: " + data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleSubServiceting ",
      });
    })


  res.status(204).json({
    status: "success",
    data: null,
  });
});

// found the service by id_1 / id_2
router.patch("/swap", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);

  if (req.body.id_1 === undefined || req.body.id_2 === undefined || req.body.id_1 === null || req.body.id_2 === null) {
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
