const initialState = {
    fetching: false,
    isAuth: false,
    refreshToken: null,
    token: null,
    refreshToken: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'AUTH/SET/TOKEN':
        return { ...state, ...payload }
    case 'AUTH/SET/FETCHING':
        return { ...state, ...payload }

    default:
        return state
    }
}
