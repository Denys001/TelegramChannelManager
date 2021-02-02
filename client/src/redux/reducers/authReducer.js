import { authAPI } from './../../api/api'
import { stopSubmit } from 'redux-form'
const initialState = {
    fetching: false,
    isAuth: false,
    token: null,
    refreshToken: null
}
const SETFETCHING = "setFetching"
const SETAUTH = "setAuth"
export default (state = initialState, action) => {
    switch (action.type) {
        case SETFETCHING:
            return { ...state, ...action.payload }
        case SETAUTH:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
export const setFetching = (value) => ({ type: SETFETCHING, payload: { fetching: value } })
export const setAuth = (token, refreshToken) => ({ type: SETAUTH, payload: { isAuth: true, token, refreshToken } })

export const LoginRequest = (data) => {
    return (dispatch) => {
        dispatch(setFetching(true))
        authAPI.login(data).then(res => {
            if (res.ResultCode === 1) {
                dispatch(stopSubmit('login', { [res.field]: res.message }))
            } else {
                dispatch(setAuth(res.token, res.refreshToken))
            }
            dispatch(setFetching(false))

        })

    }
}
export const RegisterRequest = (data) => {
    return (dispatch) => {
        dispatch(setFetching(true))
        authAPI.register(data).then(res => {
            if (res.ResultCode === 1) {
                dispatch(stopSubmit('register', { [res.field]: res.message }))
            } else {
                dispatch(setAuth(res.token))
                authAPI.login(data).then(res => {
                    dispatch(setAuth(res.token, res.refreshToken))
                })
            }
            
            dispatch(setFetching(false))
        })

    }
}


