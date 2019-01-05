const express = require('express');
const passport = require('passport');


const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const uploadCload = require('../config/cloudinary');
// Bcrypt to encrypt passwords
const bcryptSalt = 10;


const login = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (err) => {
    console.log(user);
    if (err) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(user);
    }
  });
});

// //////////////////////LOGIN ROUTE//////////////////////////////
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user,  info) => {
    if (err) { return next(err); }
    if (!user) { return res.json({ message:'Unautharized ' }); }
    req.logIn(user, (err) => {
      if (err) { return res.status(500).json({ message: 'Error login' }); }
      return res.status(200).json(user);
    });
  })(req, res, next);
});


router.get('/loggedin', (req, res) => {
  console.log('THIS IS WHAT YOU ARE LOOKING FOR', req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: 'Unauthorized' });
});

// ////////////////////////USER EDIT ROUTE ///////////////////////
router.post('/:id/edit', uploadCload.single('url'), (req, res, next) => {
  const {
    username, name, gender, imgName, url,
  } = req.body;
  console.log('This user wants To Edit its username to : ', username);
  console.log('This user wants To Edit its name to : ', name);
  console.log('This user wants To Edit its gender to : ', gender);
  console.log('This user wants To Edit its imgName to : ', imgName);
  console.log('This user wants To Edit its url to : ', url);

  User.findByIdAndUpdate({ _id:req.params.id }, {
    username, name, gender, imgName, url,
  })
    .then(() => res.status(200).json({ message:'you updated mothafucka' }))
    .catch(err => res.status(500).json({ message: 'Something Went Wrong Editing This User' }));
});

// ///////////////////SIGN UP ROUTE////////////////////////////
router.post('/signup',  uploadCload.single('url'), (req, res, next) => {
  const {
    username, password, email, name, dob, medicalLicenseNumber, gender, experience,
  } = req.body;

  const url = req.file.url;
  console.log(url);
  console.log(req.body);
  console.log('This is the username :', username);
  console.log('This is the password :', password);
  console.log('This is the email :', email);
  console.log('This is the Image url : ', url);
  console.log('This is the users name : ', name);
  console.log('This is the DOB: ', dob);
  console.log('This is the users Medical License Number: ', medicalLicenseNumber);
  console.log('This is the Gender: ', gender);
  console.log('This is the Experience: ', experience);
  if (username === '' || password === '') {
    res.json({ message: 'You must provide valid credentials' });
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      return res.json({ message: 'The username already exists' });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      url,
      name,
      dob,
      medicalLicenseNumber,
      gender,
      experience,

    });
    console.log(newUser);
    User.create({
      username,
      password: hashPass,
      email,
      url,
      name,
      dob,
      medicalLicenseNumber,
      gender,
      experience,

    })

      .then((savedUser) => {
        console.log('----------------');
        console.log(savedUser._id);

        res.status(200).json(savedUser);
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong', err });
      });
  });
});


// ///// MEDICAL APP ROUTE//////

router.get('/search/:id', (req, res) => {
  const request = require('request');
  const query = req.params.id;
  console.log(query);
  const options = {
    url: `https://api.lexigram.io/v1/lexigraph/search/?limit=10&q=${query}`,
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdSI6Imx4ZzphcGkiLCJzYyI6WyJrZzpyZWFkIiwiZXh0cmFjdGlvbjpyZWFkIl0sImFpIjoiYXBpOjY2YjRlYjE3LTE0ZDctNjBmNy00Y2QyLTRmYzI4NGY5NTE2MyIsInVpIjoidXNlcjoyYTk1YTJjNS0zZDRlLTQxOWUtMjhhZi01ODNjMDZjMjA5YzUiLCJpYXQiOjE1NDQ0NTcxMTl9.Cn77llDtcDDnOfiYjQrjnJ8guCTpjkOfdkiiR-subqI',
    },
  };

  request(options, (err, responsePayload, body) => {
    const label = responsePayload;
    // res.json(responsePayload);
    res.json(label);
  });
});

// /////////////////////LOG OUT ROUTE///////////////////////
router.get('/logout', (req, res) => {
  req.logout();
  console.log('ITS GOING INNNNNNN');
  res.status(200).json({ message:'You Logged Out Sucessfully' });
});


module.exports = router;
