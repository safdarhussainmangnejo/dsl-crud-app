const express = require("express");
const axios = require('axios');
const multer = require('multer');
const bodyParser = require("body-parser");
const fileupload = require('express-fileupload');
const fs = require('fs'); 
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
const signupSchema = require('./models/signupSchema');
const userSchema = require('./models/userSchema');


// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(fileupload());
app.use(cors());

app.use("/", express.static(path.resolve("public/images")));
app.use("/", express.static(path.join(__dirname, "public/images")));

mongoose.connect("mongodb+srv://safdarhussainmangnejo:dsldb@cluster0.1kzpq4g.mongodb.net/dslbd?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


//simple route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Yadgar Safar application." });
});

//signup user
app.post('/signupUser', async (req, res) => {

  const {email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: "kindly fill all fields!" })
  }
  else {
    await signupSchema.findOne({ email: email }).then(userExist => {
      if (userExist) {
        res.status(401).json({ message: "user already registered" })
      }
      else {
        const user = new signupSchema({ email, password });

        user.save().then(() => {

          res.status(200).json({ message: "user registered successfully" })
        }).catch(() => {

          res.status(401).json({ error: "Failed to register!" })
        })

      }
    })

  }
})

//create user 
app.post('/createUser', async (req, res) => {
  
  console.log("Received Data ", req.body)
  const {name, address, phone, about, image } = req.body;

  if (!name || !address || !phone || !about || !image) {
    res.status(401).json({ error: "kindly fill all fields!" })
  }
  else {
    
        const user = new userSchema({ name, address, phone, about, image });

        user.save().then(() => {
          console.log("User created");
          res.status(200).json({ message: "user created successfully" })
        }).catch(() => {

          res.status(401).json({ error: "Failed to register!" })
        })

      }
})

// signin user
app.post('/login', async (req, res) => {

    console.log("Received Data: ", req.body);
  
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(405).json({ error: "Email or Password missing..." });
      }
  
      const userLogin = await signupSchema.findOne({email,password});
  
      if (userLogin) {
          res.status(200).json({ message: "Login successful" })
          console.log("Login successful")
      }
      else {
        res.status(404).json({ error: "invalid credentials!" })
      }
  
    } catch (err) {
      console.log(err.message);
    }
  
  
  })


  // display all users
app.get('/displayUsers', async (req,res)=>{
  try {
    const users = await userSchema.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: "please try again later" });
  }
})

app.delete('/deleteUser/:userId', async (req,res)=>{
  console.log("User ID: ", req.params.userId);
  try{

    const result = await userSchema.deleteOne({ _id:req.params.userId });
    if(result){
    console.log(`${result.deletedCount} user(s) deleted`);
    res.send("Deleted User");
    }
  }catch (error) {
    console.error(error);
    res.send(error.message)
  }
})

// update user details
app.post('/updateUser', async (req, response) => {
  const userId = req.body.userId;
  console.log("Body : ", req.body);

  try{
    const record = await userSchema.findOneAndUpdate(
      { _id: userId },
      {
        $set: 
        {
          "image": req.body.image,
          "name": req.body.name,
          "address": req.body.address,
          "phone": req.body.phone,
          "about": req.body.about,
          
        }
      },
      { new: true }
    )
    console.log("User Data updated sucesfully")
    // response.json(record);
    response.send(record);
    
  }catch(error){
    console.log("Error in data updtion, try again")
  }

});


// get user by ID
app.get('/displaySpecificUser/:userId', async (req,res)=>{
  const userId = req.params.userId;
  console.log("Found ID: ", userId);
    
  try {
    const users = await userSchema.findById(userId);
    console.log("Searched User by ID: ", users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: "please try again later" });
  }
})


//get total number of users
app.get('/totalUsers', async (req, res) => {
  try {
    const result = await userSchema.estimatedDocumentCount();
    res.json({
      totalUsers: result,
    });
  } catch (err) {
    res.status(500).json({ err: "please try again later" });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
