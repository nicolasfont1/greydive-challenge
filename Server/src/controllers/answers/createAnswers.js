const { User, Answers } = require("../../db")

module.exports = async (req, res) => {
  const { full_name, email, birth_date, country_of_origin, terms_and_conditions, userId } = req.body;

  try {
    if (!full_name || !email || !birth_date || !country_of_origin || !terms_and_conditions || !userId) {
      throw Error("Data missing.")
    }

    const userMatch = await User.findByPk(userId)

    if (!userMatch) {
      throw Error("No user has that ID.")
    }

    const newAnswers = {
      full_name, email, birth_date, country_of_origin, terms_and_conditions, userId
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