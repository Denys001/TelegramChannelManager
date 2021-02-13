export default {
    getFetching: state => state.auth.fetching,
    getIsAuth: state => state.auth.isAuth,
    getToken: state => state.auth.token,
    getRefreshToken: state => state.auth.refreshToken,
}