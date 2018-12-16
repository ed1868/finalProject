const express = require("express");
const router = express.Router({ mergeParams: true });
const Message = require('../models/Message');

const {
  createMessage,
  // getMessage,
  // deleteMessage
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

//  - /community/:id/messages/:message_id
router
  .route("/:message_id")
  // .get(getMessage)
  // .delete(deleteMessage);

module.exports = router;