const onlySpaces = /^\s*$/;
const firstCharacterIsSpace = /^\s/;
const twoOrMoreSpaces = / {2,}/;
const rareCharacters = /["$%\/=¿¡*^\[\]{}]/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validation = (userAnswers) => {
  let errors = {}

  // --------------------------------- FULL_NAME INPUT ------------------------------------
  if (onlySpaces.test(userAnswers.full_name)) {
    errors.full_name = "Nombre completo can't be empty."
  }

  if (firstCharacterIsSpace.test(userAnswers.full_name)) {
    errors.full_name = "Nombre completo first character can't be a empty space."
  }

  if (twoOrMoreSpaces.test(userAnswers.full_name)) {
    errors.full_name = "Nombre completo can't contain two or more consecutive spaces."
  }

  if (rareCharacters.test(userAnswers.full_name)) {
    errors.full_name = "Invalid characters in Nombre completo."
  }

  if (userAnswers.full_name.length < 3) {
    errors.full_name = "Nombre completo must have more than 3 characters."
  }


  // --------------------------------- EMAIL INPUT ------------------------------------
  if (onlySpaces.test(userAnswers.email)) {
    errors.email = "Email can't be empty."
  }

  if (firstCharacterIsSpace.test(userAnswers.email)) {
    errors.email = "Email first character can't be a empty space."
  }

  if (twoOrMoreSpaces.test(userAnswers.email)) {
    errors.email = "Email can't contain two or more consecutive spaces."
  }

  if (!regexEmail.test(userAnswers.email)) {
    errors.email = "Invalid email."
  }


  // ---------------------------------- BIRTH_DATE INPUT ------------------------------------
  if (userAnswers.birth_date == "") {
    errors.birth_date = "Change the default Fecha de nacimiento value."
  }


  // ---------------------------------- COUNTRY_OF_ORIGIN INPUT ------------------------------------
  if (userAnswers.country_of_origin == "") {
    errors.country_of_origin = "Change the default País de origen value."
  }


  // ---------------------------------- TERMS_AND_CONDITION INPUT ------------------------------------
  if (userAnswers.terms_and_conditions === false) {
    errors.terms_and_conditions = "Can't save without accept terms."
  }

  return errors;
}
export default validation