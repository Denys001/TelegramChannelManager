export default {
    setTokens: (token, refreshToken) => ({type: 'AUTH/SET/TOKEN', payload: {token, refreshToken, isAuth: true}}),
    setFetching: (value) => ({type: 'AUTH/SET/FETCHING', payload:{fetching: value}}),
    login: (email, password) => ({type: 'AUTH/LOGIN', payload:{email, password}}),
    register: (email, password, nickName, passwordConfirm) => 
        ({type: 'AUTH/REGISTER', payload:{email, password, nickName, passwordConfirm}}),
}