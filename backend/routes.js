const express = require("express");

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
const getbreach=require("./controllers/getbreach");

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

router.post("/requests", function(req, res) {
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

router.post("/getContractByReceiver", function(req, res) {
  console.log("Inside getContractByReceiver route");
  confirmContract.findByReceiver(req, res);
});

router.post("/getContractBySender", function(req, res) {
  console.log("Inside getContractBySender route");
  confirmContract.findBySender(req, res);
});

module.exports = router;
