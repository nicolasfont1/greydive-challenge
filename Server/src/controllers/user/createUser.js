const { User } = require("../../db")

module.exports = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name || !password) {
      throw Error("Data missing.")
    }
    const newUser = { name, password }
  
    await User.create(newUser)
  
    return res.status(200).json("User created!")
  } catch (error) {
    if (error.message === "Data missing.") {
      return res.status(400).json("Complete all the fields.");
    } else if (error.message === "Validation error") {
      return res.status(400).json("Name already choosen.");
    } else {
      return res.status(400).json({ error: error.message });
    }
  }
}