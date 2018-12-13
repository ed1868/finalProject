const express = require('express');
const passport = require('passport');

const router = express.Router();

const Case = require('../models/Case');


// ///////////////////CASES ROUTE////////////////////////////


router.post('/new', (req, res, next) => {
  const {
    title, description, imgName, url, symptoms, timeframe, urgencyLevel, rateOfPain, systolic, diastolic, oxygen,
  } = req.body;
  const author = req.user._id;

  console.log('This is the case title :', title);
  console.log('This is the case Author Id :', author);
  console.log('This is the case description :', description);
  console.log('This is the case Image Name :', imgName);
  console.log('This is the case Image url : ', url);
  console.log('This is the case symptoms : ', symptoms);
  console.log('This is the case timefram : ', timeframe);
  console.log('This is the case urgency level : ', urgencyLevel);
  console.log('This is the case rate of pain : ', rateOfPain);
  console.log('This is the case Systolic vital sign : ', systolic);
  console.log('This is the case Diastolic vital sign : ', diastolic);
  console.log('This is the case Oxygen Measure : ', oxygen);


  const newCase = new Case({
    title,
    author,
    description,
    imgName,
    url,
    symptoms,
    timeframe,
    urgencyLevel,
    rateOfPain,
    systolic,
    diastolic,
    oxygen,
  });

  newCase.save()
    .then(savedCase => res.status(200).json(savedCase))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

// // /////////////////////CASES EDIT ROUTE////////////////////////
router.post('/:id/edit', (req, res, next) => {
  const {
    title, description, imgName, url, symptoms, timeframe, urgencyLevel, rateOfPain, systolic, diastolic, oxygen,
  } = req.body;
  console.log('This user wants To Edit The Cases title to : ', title);
  console.log('This user wants To Edit The Cases description to : ', description);
  console.log('This user wants To Edit The Cases imgName to : ', imgName);
  console.log('This user wants To Edit The Cases url to : ', url);
  console.log('This user wants To Edit The Cases symptoms to : ', symptoms);
  console.log('This user wants To Edit The Cases timeframe to : ', timeframe);
  console.log('This user wants To Edit The Cases urgency Level to : ', urgencyLevel);
  console.log('This user wants To Edit The Cases rate of pain to : ', rateOfPain);
  console.log('This user wants To Edit The Cases systolic to : ', systolic);
  console.log('This user wants To Edit The Cases diastolic to : ', diastolic);
  console.log('This user wants To Edit The Cases oxygen to : ', oxygen);


  Case.findByIdAndUpdate({ _id:req.params.id }, {
    title, description, imgName, url, symptoms, timeframe, urgencyLevel, rateOfPain, systolic, diastolic, oxygen,
  })
    .then(() => res.status(200).json({ message:'you updated mothafucka' }))
    .catch(err => res.status(500).json({ message: 'Something Went Wrong Editing This Case' }));
});


// /////////////////// CASE DELETE ROUTE/////////////////////////


router.delete('/:case_id',  (req, res, next) => {
  Case.findByIdAndRemove(req.params.case_id, (err) => {
    if (err) {
      console.log('There was an error Deleting This Case : ', err);
      res.status(500).json({ message: 'Something Went Wrong While Deleting This Case' });
    } else {
      res.status(200).json({ message: 'You have Successfully Deleted The Case' });
    }
  });
});

module.exports = router;