// const fs = require('fs')
const multer = require('multer')
const router = require("express").Router();
const path = require('path');
 
/** 
 * POST
 * /upload
 * */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend-user/src/assets/uploads')
    console.log('in destination')
  },
  filename: function (req, file, cb) {
    // 设置保存文件的名称，这里以时间代替原文件名[file.originalname]
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// ./public/uploads
 
// var createFolder = function (folder) {
//   try {
//     fs.accessSync(folder)
//   } catch (e) {
//     fs.mkdirSync(folder)
//   }
// }
 
// var uploadFolder = './upload/'
// createFolder(uploadFolder)
var upload = multer({
  storage: storage
})
 
// router.post('/upload', upload.single('file'),
//   function (req, res, next) {
//     var file = req.file
//     console.log(file)
//     res.send(file)
//   })

router.post("/", upload.single('file'), 
function (req, res, next) {
  var file = req.file
  console.log("in uploadRoutes")
  console.log(file)
  res.send(file)
});


// async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   if (req.body.files === null || req.body.files === undefined) {
//     res.status(400).send({
//       message: "Uploaded content can not be empty!",
//     });
//     console.log(req.body);
//     return;
//   }
 
module.exports = router