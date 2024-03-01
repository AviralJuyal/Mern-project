const userModel = require("../models/UserModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const jwt_token = process.env.JWT_TOKEN;

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    let user = await userModel.findOne({ email: req.body.email });

    if (user)
      return res
        .status(400)
        .json({ success: false, error: "Sorry , A user already exists" });

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await userModel.create({
      ...req.body,
      password: secPass,
      verified: false,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, jwt_token);
    res.json({
      success: true,
      msg: "user created successfully",
      userId: user.id,
      authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body);
    let user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: "Please Enter correct credentials " });

    let pass = await bcrypt.compare(req.body.password, user.password);

    if (!pass)
      return res
        .status(400)
        .json({ success: false, msg: "Please Enter correct credetials !" });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, jwt_token);

    res.json({ success: true, authToken, userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};

exports.UserData = async (req, res) => {
  try {
    let user = await userModel.findById(req.user.id);
    if (!user)
      return res.status(404).send({ success: false, msg: "user not found!" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};
