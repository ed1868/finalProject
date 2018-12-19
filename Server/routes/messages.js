const express = require('express');

const router = express.Router({ mergeParams: true });
const Message = require('../models/Message');

const {
  createMessage,
  getMessage,
  deleteMessage,
} = require('../handlers/messages');


// / -/community where it shows all messages from users

router.get('/', (req, res, next) => {
  Message.find()
    .sort({ createdAt: 'desc' })
    .populate('user', {
      username: true,
      url: true,
    }).then((messages) => {
      console.log(messages);
      return res.status(200).json({ messages });
    })
    .catch(err => res.status(500).json({ message : err }));
});

//  - /community/messages/new
// router.route("/messages/new").post(createMessage);

router.post('/messages/new', (req, res, next) => {
  console.log(req.body);
  const {
    title, text,
  } = req.body;

  const author = req.user._id;
  const authorName = req.user.username;


  console.log('This is the Status title :', title);
  console.log('This is the Status text  :', text);
  console.log('This is the Status Author ID :', author);
  console.log('This is the Status Author username :', authorName);

  const newMessage = new Message({
    title,
    text,
    user:req.user._id,
  });

  newMessage.save()
    .then(savedMessage => res.status(200).json(savedMessage))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

// GET - /community/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
  try {
    const message = await Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// DELETE /community/:id/messages/:message_id

exports.deleteMessage = async function (req, res, next) {
  try {
    const foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();

    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
//  - /community/:id/messages/:message_id
// router
//   .route("/:message_id")
//   .get(getMessage)
//   // .delete(deleteMessage);

module.exports = router;
