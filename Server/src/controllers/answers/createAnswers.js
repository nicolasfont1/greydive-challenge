const { User, Answers } = require("../../db")

module.exports = async (req, res) => {
  const { completeName, email, birthdate, country, terms, userId } = req.body;

  try {
    if (!completeName || !email || !birthdate || !country || !terms || !userId) {
      throw Error("Data missing.")
    }

    const userMatch = await User.findByPk(userId)

    if (!userMatch) {
      throw Error("No user has that ID.")
    }

    const newAnswers = {
      completeName, email, birthdate, country, terms, userId
    }

    const newAnswersDB = await Answers.create(newAnswers)

    return res.status(200).json("Answers saved!")
  } catch (error) {
    if (error.message === "Data missing.") {
      return res.status(400).json("Complete all the fields.");
    } else {
      return res.status(400).json({ error: error.message });
    }
  }
}