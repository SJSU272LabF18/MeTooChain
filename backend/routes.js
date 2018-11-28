const express = require("express");
const app = express();
const router = express.Router();
const Image = require("./controllers/images");
const userlogin = require("./controllers/login");
const requests = require("./controllers/getrequests");
const confirmContract = require("./controllers/confirmContract");
const consent = require("./controllers/giveconsent");
const notifications = require("./controllers/getnotifications");
const signup = require("./controllers/signup");
const requestconsent = require("./controllers/requestconsent");
const filebreach = require("./controllers/fileBreach");
const getbreach = require("./controllers/getbreach");
const uploadprofileimage = require("./controllers/uploadimage");
let fs = require("fs");
const multer = require("multer");
router.get("/", Image.test);
router.get("/accounts", Image.accounts);
router.get("/web3-status", Image.webStatus);

router.get("/files/:name", Image.getData);

router.get("/images", Image.all);
router.get("/images/:label", Image.findByLabel);
// find image by id
router.get("/images-id/:id", Image.findById);

/*  upload POST endpoint */
console.log("Hello World initial");

router.post(
  "/upload",
  Image.upload.single("file"),
  Image.uploadFile,
  Image.postData,
  Image.create
);

router.get("/getfile/:hash", Image.getFile);

router.post("/login", function(req, res) {
  console.log("Inside login route", req.body);
  userlogin.login(req, res);
});

router.get("/requests", function(req, res) {
  console.log("Inside requests route");
  requests.getrequests(req, res);
});

router.post(
  "/confirmContract",
  confirmContract.upload.single("file"),
  confirmContract.uploadFile,
  confirmContract.postData,
  confirmContract.create
);

router.post("/giveconsent", function(req, res) {
  console.log("Inside consent route");
  consent.giveconsent(req, res);
});

router.post("/getnotifications", function(req, res) {
  console.log("Inside notifications route");
  notifications.getnotifications(req, res);
});
router.post("/requestconsent", function(req, res) {
  console.log("Inside request consent route");
  requestconsent.requestconsent(req, res);
});
router.post("/filebreach", function(req, res) {
  console.log("Inside filebreach route");
  filebreach.filebreach(req, res);
});
router.post("/getbreach", function(req, res) {
  console.log("Inside getBreach route");
  getbreach.getbreach(req, res);
});

router.post("/signup", function(req, res) {
  console.log("Inside signup route");
  signup.usersignup(req, res);
});

var username = "sojan";

var storagePropFiles = multer.diskStorage({
  destination: function(req, file, callback) {
    console.log("req.session.user is", JSON.stringify(req.params));
    callback(null, createDirectory(username));
  },
  filename: function(req, file, callback) {
    console.log("req", req.body);
    callback(null, file.originalname);
  }
});

var rootDirectory = "public/images/";

var uploadPropFiles = multer({
  storage: storagePropFiles
});

function createDirectory(username) {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  let directory = rootDirectory + username;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
}

router.post("/upload-image/", uploadPropFiles.any(), function(req, res, next) {
  console.log("###/saveProfile");
  console.log(JSON.stringify(req.body));
  console.log(req.body);
  if (true) {
    console.log(req.body, "Body");
    // console.log(req.files, 'files');
    res.status(200).send({ result: "File is uploaded" });
  } else {
    res.statusMessage = "invalid session";
    res.status(401).end();
  }
});
const filepath =
  "/Users/mathewsojan/SoftwareEngineering/CMPE272/TrustMe_v1/Project-Team-17/backend/public/images";

router.post("/getProfileImg", function(req, res, next) {
  console.log("image body", req.body);
  var username = req.body.username; //req.body.username
  //console.log("req.session.username for image", req.session.username);
  var filter = ".png";
  var results = [];
  var startPath =
    "/Users/mathewsojan/SoftwareEngineering/CMPE272/TrustMe_v1/Project-Team-17/backend/public/images/" +
    username;
  if (username) {
    var files = fs.readdirSync(startPath);
    console.log("files", files);

    console.log(files.length);

    fs.readFile(startPath + "/" + files[0], function(err, content) {
      console.log("###img:", content);
      console.log("###filename:", files[0]);
      if (err) {
        res.writeHead(400, { "Content-type": "text/html" });
        console.log(err);
        res.end("No such image");
      } else {
        let base64Image = new Buffer(content, "binary").toString("base64");

        console.log("###image in node");

        res.status(200).send({ user: username, img: base64Image });
        // res.end({img : base64Image});
      }
    });
  } else {
    res.statusMessage = "invalid session";
    res.status(401).end();
  }
});

module.exports = router;
