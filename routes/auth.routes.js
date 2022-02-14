const express = require('express');


const bcrypt = require("bcrypt");

const saltRounds =  10;
const User = require('../models/User.model');
const router = express.Router();
const isNotLoggedIn = require("./../middleware/isNotLoggedIn");

router.route("/signup")
.get((req, res , isNotLoggedIn,)=>{
    
    res.render('signup')

})
.post((req,res, isNotLoggedIn)=>{
    const {username, password} = req.body
    if (!username || !password) {
        res.render("auth/signup", { errorMessage: "Something went wrong" });
      }

      //Check if user already exists
  User.findOne({ username: username })
    .then((user) => {
      //If user exists, send error
      if (user) {
        res.render("auth/signup", { errorMessage: "This user already exists" });
        return;
      } else {
        //Hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        console.log(salt)
        const hash = bcrypt.hashSync(password, salt);

        //If user does not exist, create it
        User.create({ username, password: hash })
          .then((newUser) => {
            console.log(newUser);
            //Once created, redirect
            res.redirect("/auth/login");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch(console.log)


})

router.route("/login")
.get((req,res) => res.render("login-form"))
.post((req,res)=>{
    const {username, password} = req.body
    if(!username || !password){res.render("login-form", {error:{type: "CRED_ERR", msg: "Missing credentials"}})}
    
    User.findOne({username})
    .then((user)=>{
        console.log(user)
        if(!user.username) {res.render("login-form", {error:{type: "USR_ERR", msg: "User does not exist"}})}
        if(user.username){
            //req.session.user = user
            res.render("user-profile")
        }
    })

    
 
})
module.exports = router;
