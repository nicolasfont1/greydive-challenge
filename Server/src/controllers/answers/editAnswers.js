const { Answers } = require("../../db")

module.exports = async (req, res) => {
  const { full_name, email, birth_date, country_of_origin, terms_and_conditions, userId } = req.body

  try {
    const answersDB = await Answers.findOne({ where: { userId: userId } })

    await Answers.update(
      {
        full_name: full_name ? full_name : answersDB.full_name,
        email: email ? email : answersDB.email,
        birth_date: birth_date ? birth_date : answersDB.birth_date,
        country_of_origin: country_of_origin ? country_of_origin : answersDB.country_of_origin,
        terms_and_conditions: terms_and_conditions ? terms_and_conditions : answersDB.terms_and_conditions,
      },
      {
        where: { userId: userId }
      }
    )

    res.status(200).json("Answers successfully updated.")
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}