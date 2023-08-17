const { User } = require("../../db")

module.exports = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      throw Error("Name field can't be null.")
    }
    const newUser = { name }
  
    const response = await User.create(newUser)
  
    return res.status(200).json(response.id)
  } catch (error) {
    if (error.message === "Name field can't be null.") {
      return res.status(400).json("Name field can't be null.");
    } else if (error.message === "Validation error") {
      return res.status(400).json("Name already choosen.");
    } else {
      return res.status(400).json({ error: error.message });
    }
  }
}