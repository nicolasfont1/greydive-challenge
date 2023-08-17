const { Answers, User } = require("../../db")

module.exports = async (req, res) => {
  const { userId } = req.query

  try {
    const userDB = await User.findOne({ where: { id: userId } })
    if (!userDB) {
      throw Error("Non registered name.")
    }

    const answersDB = await Answers.findOne({ where: { userId: userDB.id } })

    if (!answersDB) {
      return res.status(200).json("No answers.")
    }

    return res.status(200).json({ answersDB })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}