const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { form, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully." });
    return res.json({ msg: "Failed to add message to the database." });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllMessage = async (req, res, next) => {};
