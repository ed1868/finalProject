const express = require('express');
const passport = require('passport');

const router = express.Router();

const Case = require('../models/Case');


// ///////////////////CASES ROUTE////////////////////////////


router.post('/new', (req, res, next) => {
  const {
    title, description, imgName, url, symptoms, timeframe, urgencyLevel, rateOfPain, systolic, diastolic, oxygen,
  } = req.body;
  const author = req._id;

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
// router.post('/:id/edit', (req, res, next) => {
//   Case.findByIdAndUpdate({req.params.id}, (err, case) => {

//   })
// });


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
