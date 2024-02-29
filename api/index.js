const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345w";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieparser());

mongoose.connect(
  "mongodb+srv://anshkumar:eo2wwhzgsJ8dx9H3@cluster0.83gizbe.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }

  // res.json({ requestData: { username, password } });
  // res.json("TEST OK66");
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passok = bcrypt.compareSync(password, userDoc.password);
  // res.json(passok);
  if (passok) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  // res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(",");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;

  //uploding the file
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  // res.json({ files: req.file });
  res.json(postDoc);
});

app.listen(4000);

// anshkumar
// eo2wwhzgsJ8dx9H3

// copy the password into the link

// mongodb+srv://anshkumar:<eo2wwhzgsJ8dx9H3>@cluster0.83gizbe.mongodb.net/?retryWrites=true&w=majority

// const cors = require("cors");
// const mongoose = require("mongoose");

// const User = require("./models/User");

// app.use(cors());
// app.use(express.json());

// mongoose.connect(
//   "mongodb+srv://anshkumar:eo2wwhzgsJ8dx9H3@cluster0.83gizbe.mongodb.net/?retryWrites=true&w=majority"
// );

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const userDoc = await User.create({ username, password });
//   res.json(userDoc);
//   res.json("testok 3");
// });
