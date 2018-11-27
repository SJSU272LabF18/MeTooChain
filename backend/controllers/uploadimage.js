var storagePropFiles = multer.diskStorage({
  destination: function(req, file, callback) {
    console.log("req.session.user is", JSON.stringify(req.params));
    callback(null, createDirectory(prop_id));
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

function createDirectory(prop_id) {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  let directory = rootDirectory + prop_id;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
}

app.post("/upload-files/", uploadPropFiles.any(), function(req, res, next) {
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
