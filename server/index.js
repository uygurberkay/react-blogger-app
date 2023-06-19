const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
require('dotenv').config()
const app = express();

/* It generates bcrypt password according to this string */
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfasjdf3423sf';
const PORT = process.env.PORT;
const MONGODB = process.env.MONGO_DB;
/* MIDDLEWARE */
/* Cors Library help get post request withour CORS error from website */
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())
/* İts let us read cookies */
app.use(cookieParser())

mongoose.connect(MONGODB)


/* Register Post Request */
app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  
/* Login Post Request */
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        /* Login in functionality */
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });

/* Get request for profile login check */
app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  /* Log out functionality */
  res.cookie('token', '').json('ok');
});

app.post('/post',uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length -1];
  const newPath = path+'.'+ext;
  fs.renameSync(path,newPath);
  /* Creates Post */
  const {title,summary,content} = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  })
  
  res.json(postDoc);
});
  
app.listen(PORT || 4000, ()=> {
    console.log(`Server is running at port : ${PORT}`)
});
