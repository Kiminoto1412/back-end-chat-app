const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //   user จะreturn ทุกอย่างที่createมา ซึ่งเราจะต้องซ่อน passwordไว้ก่อนส่งกลับ ด้วย delete
    // delete user.password;
    //ส่ง user กลับไป
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
