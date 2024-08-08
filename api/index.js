require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer  = require('multer')
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const imgDownload = require('image-downloader')
const mongoose = require("mongoose");
const User = require("./models/user");
const place = require('./models/places')
const fs = require('fs');

const bcryptSalt = bcrypt.genSaltSync(5);
const jwtsecret = "aaa";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads/'))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get('/test', (req,res)=>{
  res.json('connected')
})

mongoose.connect(process.env.mongo_URL);

// Handling Post of RegisterPage
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ userDoc });
  } catch (e) {
    res.status(422).json(e);
  }
});

// Handling Post of LoginPage`
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const Doc = await User.findOne({ email });

  if (Doc) {
    const passok = bcrypt.compareSync(password, Doc.password);
    if (passok) {
      jwt.sign(
        {
          name: Doc.name,
          email: Doc.email,
          id: Doc._id,
        },
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(Doc);
        }
      );
    } else {
      res.json("not ok");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtsecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

app.post('/uploadbylink', async(req,res)=>{

  const {URL} = req.body;
  const path = __dirname + '/uploads/'

  const newName = 'photo' + Date.now() + '.jpg'

try{
  await imgDownload.image({    
    url: URL,
    dest: path + newName
  })
  res.json(newName)
}catch(e){
    console.log(e);
}


})
const photosMiddleware = multer({dest:'uploads/'})
app.post('/uploads',photosMiddleware.array('photos', 100), (req,res)=>{
  const uploadedfiles=[];
  for(let i = 0; i<req.files.length; i++){
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedfiles.push(newPath.replace('uploads\\', ''))
  }
  res.json(uploadedfiles)
})

app.get('/places', (req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    const {id} = user;
    res.json(await place.find({owner:id}))
  })

})

app.post('/places',(req,res)=>{
  const { token } = req.cookies;

  const {title, address,description,addedPhoto, checkIn, checkOut, perks, maxGuests, extraInfo} = req.body

  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await place.create({
      owner: user.id,
      title, address,photos:addedPhoto,description, addedPhoto, checkIn, checkOut, perks, maxGuests, extraInfo
  });
  res.json(placeDoc)
  })
})

app.get('/places/:id',async(req,res) => {
  const {id} = req.params;
// database query not sending any response 
// res.json is null
    res.json(await place.findById(id))

})

app.listen(4000);
