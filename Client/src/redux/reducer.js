import { REGISTER_USER, GET_USER, POST_ANSWERS, GET_ANSWERS, EDIT_ANSWERS} from "./action-types"

const initialState = {
  userId: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      let userId = action.payload

      return {
        ...state,
        userId: userId
      }

    default: return { ...state }
  }
}

export default reducer;