// let fs = require("fs");
// const multer = require("multer");
// var username = "sojan";

// var storagePropFiles = multer.diskStorage({
//   destination: function(req, file, callback) {
//     console.log("req.session.user is", JSON.stringify(req.params));
//     callback(null, createDirectory(username));
//   },
//   filename: function(req, file, callback) {
//     console.log("req", req.body);
//     callback(null, file.originalname);
//   }
// });

// var rootDirectory = "public/images/";

// uploadPropFiles = multer({
//   storage: storagePropFiles
// });

// function createDirectory(username) {
//   if (!fs.existsSync(rootDirectory)) {
//     fs.mkdirSync(rootDirectory);
//   }
//   let directory = rootDirectory + username;
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory);
//   }
//   return directory;
// }

// app.post("/upload-image/", uploadPropFiles.any(), function(req, res, next) {
//   console.log("###/saveProfile");
//   console.log(JSON.stringify(req.body));
//   console.log(req.body);
//   if (true) {
//     console.log(req.body, "Body");
//     // console.log(req.files, 'files');
//     res.status(200).send({ result: "File is uploaded" });
//   } else {
//     res.statusMessage = "invalid session";
//     res.status(401).end();
//   }
// });
