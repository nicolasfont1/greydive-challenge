const { User } = require("../../db")

module.exports = async (req, res) => {
  const { name } = req.query

  try {
    const userDB = await User.findOne({ where: { name: name } })
    if (!userDB) {
      return res.status(200).json("Non registered name.")
    }

    return res.status(200).json(userDB.id)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}