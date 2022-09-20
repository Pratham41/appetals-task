import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    USER_LOGOUT
  } from "../constants/user";
  
  export const userLoginReducer = (state = {}, action) => {
      switch (action.type) {
        case USER_LOGIN_REQUEST:
          return { loading: true }
        case USER_LOGIN_SUCCESS:
          return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
          return { loading: false, error: action.payload }
        case USER_LOGOUT:
          return {}
        default:
          return state
      }
  }

  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, userData: action.payload }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }

      default:
        return state
    }
}

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true }
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, userUpdatedData: action.payload }
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}