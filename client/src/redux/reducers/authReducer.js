import { authAPI } from './../../api/api'
import { stopSubmit } from 'redux-form'
const initialState = {
    fetching: false,
    isAuth: false,
    token: null
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
export const setAuth = (token) => ({ type: SETAUTH, payload: { isAuth: true, token } })

export const LoginRequest = (data) => {
    return (dispatch) => {
        dispatch(setFetching(true))
        authAPI.login(data).then(res => {
            if (res.ResualtCode === 1) {
                dispatch(stopSubmit('login', { [res.field]: res.message }))
            } else {
                dispatch(setAuth(res.token))
                console.log('auth is success');
            }
            dispatch(setFetching(false))

        })

    }
}
export const RegisterRequest = (data) => {
    return (dispatch) => {
        dispatch(setFetching(true))
        authAPI.register(data).then(res => {
            if (res.ResualtCode === 1) {
                dispatch(stopSubmit('register', { [res.field]: res.message }))
            } else {
                dispatch(setAuth(res.token))
                console.log('auth is success');
            }
            dispatch(setFetching(false))
        })

    }
}


