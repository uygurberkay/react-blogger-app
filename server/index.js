const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const app = express();

/* It generates bcrypt password according to this string */
const salt = bcrypt.genSaltSync(10);
const secret = 'asdfasjdf3423sf';
/* MIDDLEWARE */
/* Cors Library help get post request withour CORS error from website */
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())

mongoose.connect('mongodb+srv://uygurberkay0:123456Asd@cluster0.afusyu3.mongodb.net/')


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
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });


app.listen(4000, ()=> {
    console.log(`Server is running at port : ${4000}`)
});
