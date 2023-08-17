import { REGISTER_USER, GET_USER, POST_ANSWERS, GET_ANSWERS, EDIT_ANSWERS } from "./action-types"
import axios from "axios"

const urlBase = "http://localhost:3001/"

export const registerUser = (userData) => {
  try {
    return async (dispatch) => {
      const response = (await axios.post(urlBase + "user", userData)).data
      return dispatch({
        type: REGISTER_USER,
        payload: response
      })
    }
  } catch (error) {
    return(error.message)
  }
}

export const getUser = (name) => {
  try {
    return async () => {
      const response = (await axios.get(urlBase + `user?name=${name}`)).data
      return response
    }
  } catch (error) {
    return error.message
  }
}

export const postAnswers = (userAnswers) => {
  try {
    return async () => {
      const response = (await axios.post(urlBase + "answers", userAnswers)).data
      return response
    }
  } catch (error) {
    return(error)
  }
}

export const getAnswers = (userId) => {
  try {
    return async () => {
      const response = (await axios.get(urlBase + `answers?userId=${userId}`)).data
      return response
    }
  } catch (error) {
    return error.message
  }
}

export const editAnswers = (userAnswers) => {
  try {
    return async () => {
      const response = (await axios.put(urlBase + `answers`, userAnswers)).data
      return response
    }
  } catch (error) {
    return error.message
  }
}