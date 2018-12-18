const User = require('../models/User');
const Message = require('../models/Message');

exports.createMessage = async function (req, res, next) {
  try {
    const message = await Message.create({
      title: req.body.title,
      text: req.body.text,
      author: req.params.id,
      authorName: req.user.username
    });
    const foundUser = await User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    const foundMessage = await Message.findById(message._id).populate('user', {
      username: true,
      url: true,
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
