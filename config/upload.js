const multer = require("multer");

const imageFilter = (req, file, cb) => {
  console.log("In the Multer Image Filter.");

  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, __dirname + "/Assets/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-shoppr-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
console.log(">>>>>>upload file keys",Object.keys(uploadFile))
module.exports = uploadFile;
