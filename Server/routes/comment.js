const express = require('express');
const passport = require('passport');

const router = express.Router();

const Comment = require('../models/Comment');


// ///////////////////COMMENT ROUTE////////////////////////////


router.post('/new', (req, res, next) => {
  const {
    text, title,
  } = req.body;
  const author = req.user._id;

  console.log('This is the comment title :', title);
  console.log('This is the comment Author Id :', author);
  console.log('This is the comment text :', text);


  const newComment = new Comment({
    title,
    author,
    text,
  });

  newComment.save()
    .then(savedComment => res.status(200).json(savedComment))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

// // /////////////////////COMMENT EDIT ROUTE////////////////////////
router.post('/:id/edit', (req, res, next) => {
  const { title, text } = req.body;
  console.log('This user wants To Edit the Comment title to : ', title);
  console.log('This user wants To Edit the Comment text to : ', text);
  Comment.findByIdAndUpdate({ _id:req.params.id }, { title, text })
    .then(() => res.status(200).json({ message:'you updated mothafucka' }))
    .catch(err => res.status(500).json({ message: 'Something Went Wrong Editing This Comment' }));
});


// /////////////////// COMMENT DELETE ROUTE/////////////////////////


router.delete('/:comment_id',  (req, res, next) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      console.log('There was an error Deleting This Comment : ', err);
      res.status(500).json({ message: 'Something Went Wrong While Deleting This Comment' });
    } else {
      res.status(200).json({ message: 'You have Successfully Deleted The Comment' });
    }
  });
});

module.exports = router;
