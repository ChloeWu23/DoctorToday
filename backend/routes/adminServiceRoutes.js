const router = require("express").Router();

/*
    post("/")  : add new service, need serviceName
    patch("/") : update current service, need service_cat_id
    delete("/") : delete service, need service_cat_id
    patch("/swap") : swap two service, need req.body.id_1 && req.body.id_2
*/

// const fs = require('fs');
// const data = JSON.parse(
//   fs.readFileSync('./config-data/data.json')
// );

const db = require("../app/models");
const ServiceOverviews = db.ServiceOverviews;
const Op = db.Sequelize.Op;

// need req.body { serviceName, service_cat_id, description_1 }

router.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (!req.body.serviceName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var count = await ServiceOverviews.count({ col: "serviceName" });

  var serviceItem = {
    serviceName: req.body.serviceName,
    service_cat_id: count,
    description_1: req.body.description_1,
    description_2: req.body.description_2,
    description_3: req.body.description_3,
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

  // const newId = data[data.length - 1].id + 1;
  // const newService = Object.assign({ id : newId }, req.body);

  // // const newService = Object.assign(req.body);
  // data.push(newService);

  // fs.writeFile( // todo : async or sync ?
  //     './config-data/data.json',
  //     JSON.stringify(data, null, 2),
  //     'utf-8',
  //     err => {
  //         res.status(201).json({
  //             status: 'success',
  //             data: {
  //                 data: newService
  //             }
  //         });
  //     }
  // );
});

// found the service by service_cat_id
router.patch("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);

  if (req.body.service_cat_id === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const patchItem = await ServiceOverviews.findByPk(req.body.service_cat_id);
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
router.delete("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);

  if (req.body.service_cat_id === null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var count = await ServiceOverviews.count({ col: "service_cat_id" });

  // console.log("original rows size: " + count);

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

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// found the service by id_1 / id_2
router.patch("/swap", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.body);

  if (req.body.id_1 === null || req.body.id_2 === null) {
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
