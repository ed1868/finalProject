const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
// Bcrypt to encrypt passwords
const bcryptSalt = 10;


const login = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (err) => {
    console.log('req.login ');
    console.log(user);
    if (err) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(user);
    }
  });
});

// ///////////////////LOGIN ROUTE//////////////////////////////
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user,  info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    login(req, user).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

// ///////////////////SIGN UP ROUTE////////////////////////////
router.post('/signup', (req, res, next) => {
  const {
    username, password, email, imgName, name, dob, medicalLicenseNumber, gender,
  } = req.body;
  console.log('This is the username :', username);
  console.log('This is the password :', password);
  console.log('This is the email :', email);
  console.log('This is the Image Name : ', imgName);
  console.log('This is the users name : ', name);
  console.log('This is the DOB: ', dob);
  console.log('This is the users Medical License Number: ', medicalLicenseNumber);
  console.log('This is the Gender: ', gender);
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
      imgName,
      name,
      dob,
      medicalLicenseNumber,
      gender,
    });

    newUser.save()
      .then(savedUser => res.status(200).json(savedUser))
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });
});

// /////////////////////LOG OUT ROUTE///////////////////////
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message:'You Logged Out Sucessfully' });
});


module.exports = router;
