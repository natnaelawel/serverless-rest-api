const db = require("../db/user");
var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await db.checkUser(email, password);
    if (!data) {
      console.log("password is incorrect ");
    }
    const token = jwt.sign({ data }, "secret", { expiresIn: "1h" });
    return res.json({ message: "success", token });
  } catch (error) {
    console.log("there is an error", error);
    res.json({ message: "there is an error" });
  }
};

const register = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    const data = await db.getUser(email);
    console.log("data i s", data)
    if (data && data.length < 1) {
      const data = await db.createUser(
        firstname,
        lastname,
        email,
        password,
        role
      );
      if (!data) {
        res.status(403).json({ message: "there is an error on creating user" });
      }
      return res.json({message: "success"});
    }
    return res
      .status(500)
      .json({ message: "the user with this email already exists" });
  } catch (error) {
    console.log("there is an error", error);
    res.json({ message: "there is an error" });
  }
};

const logOut = async (req, res) => {};


const getAllUsers = async (req, res, next) => {
  try {
    const result = await db.getUsers();
    console.log("result is ", result);
    return res.json(result);
  } catch (error) {
    console.log("there is an error", error);
    res.json({ message: "there is an error" });
  }
};



module.exports = {
  login,
  register,
  logOut,
  getAllUsers
};

// try {
//   var decoded = jwt.verify(token, "wrong-secret");
// } catch (err) {
//   // err
// }
