const IpfsAPI = require("ipfs-api");
// connect to ipfs daemon API server
// const ipfs = IpfsAPI('localhost', '5001', { protocol: 'http' })

const ipfs = new IpfsAPI({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
// https://gateway.ipfs.io/ipfs/:hash
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Web3 = require("web3");
const Image = require("../models/images");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const code = fs.readFileSync("./contracts/StoreHash.sol").toString();
const solc = require("solc");

const compiledCode = solc.compile(code);
const abi = JSON.parse(compiledCode.contracts[":SaveAddress"].interface);
const SavingContract = new web3.eth.Contract(
  abi,
  "0xb1caf625d9d29421dfd8dae4a7a9083b4175f80a"
);
// const Image = require("../models/images");

const MAX_SIZE = 52428800;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
  }
});

exports.upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
exports.uploadFile = async (req, res, next) => {
    console.log("Hello World uploadFile");
    // if (mime.split("/")[0] !== "image") {
    //   fs.unlink(req.file.path);
  
    //   return res.status(422).json({
    //     error: "File needs to be an image."
    //   });
    // }
  console.log(req.body);
    // if (fileSize > MAX_SIZE) {
    //   fs.unlink(req.file.path);
  
    //   return res.status(422).json({
    //     error: `Image needs to be smaller than ${MAX_SIZE} bytes.`
    //   });
    // }
  
   // const data = fs.readFileSync(req.file.path);

   //generate file here
   var writeStream = fs.createWriteStream(req.body.user+".txt");
   writeStream.write("Contract Details \n");
   writeStream.write("This is a trustworthy,Immutable contract between "+req.body.user+" and "+req.body.sendername+"\n");
   writeStream.write("Contract Details \n"+req.body.preference);
   writeStream.end();
   //end
   //const data = fs.readFileSync(req.file.path);
   fs.readFile(req.body.user+".txt", (err, data)=> {
    console.log("inside readfile error");
    console.log(data)
    const obj={
      data:data
    };

    return ipfs
      .add(data)
      .then(file => {
        if (file) {
          req.data = file;
          next();
        } else {
          res.status(400).send("Error processing file");
        }
      })
      .catch(err => {
        console.log("inside ipfs error")
        console.log(err.message);
        res.status(500).send(err.message);
      });
});
   
  };
  
exports.postData = async (req, res, next) => {
    try {
      const { hash } = req.data[0];
      const accounts = await web3.eth.getAccounts();
  
      const resp = await SavingContract.methods.saveHash(hash).send({
        from: accounts[0]
      });
      console.log("Hello World");
      console.log(JSON.stringify(resp));
      const data = Object.assign({ ipfsHash: hash }, resp);
      req.data = data;
  
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  };
  exports.create = async (req, res) => {
    try {
      const data = {
        label: req.body.label,
        ipfsHash: req.data.ipfsHash,
        ipfsAddress: `https://gateway.ipfs.io/ipfs/${req.data.ipfsHash}`,
        transactionHash: req.data.ipfsHash,
        blockHash: req.data.blockHash
      };
      const resp = await Image.create(data);
      res.send(resp);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
exports.confirmContract=()=>{

}