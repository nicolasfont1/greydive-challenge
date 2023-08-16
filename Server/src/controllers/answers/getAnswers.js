const { Answers } = require("../../db")

module.exports = async (req, res) => {
  const { userId } = req.query

  try {
    if (!userId) {
      throw Error("Invalid ID.")
    }
    const answersDB = await Answers.findOne({ where: { userId: userId } })
    
    if (!answersDB) {
      throw Error("No answers.")
    }
    
    return res.status(200).json({answersDB})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}