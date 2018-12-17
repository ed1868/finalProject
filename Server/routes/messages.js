const express = require("express");
const router = express.Router({ mergeParams: true });
const Message = require('../models/Message');

const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../handlers/messages");


/// -/community where it shows all messages from users 

router.get("/community", async function(req, res, next) {
  try {
    let messages = await Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        url: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

//  - /community/:id/messages
router.route("/").post(createMessage);


// GET - /community/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
  try {
    let message = await Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// DELETE /community/:id/messages/:message_id

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await Message.findById(req.params.message_id);
    await foundMessage.remove();

    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
//  - /community/:id/messages/:message_id
router
  .route("/:message_id")
  // .get(getMessage)
  // .delete(deleteMessage);

module.exports = router;