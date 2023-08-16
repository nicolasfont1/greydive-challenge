const { Answers } = require("../../db")

module.exports = async (req, res) => {
  const { completeName, email, birthdate, country, terms, userId } = req.body

  try {
    const answersDB = await Answers.findOne({ where: { userId: userId } })

    await Answers.update(
      {
        completeName: completeName ? completeName : answersDB.completeName,
        email: email ? email : answersDB.email,
        birthdate: birthdate ? birthdate : answersDB.birthdate,
        country: country ? country : answersDB.country,
        terms: terms ? terms : answersDB.terms,
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