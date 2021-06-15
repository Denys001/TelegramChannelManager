export default {
    getToken: state => state.auth.token,
    getCode: state => state.channels.code,
    getFetching: state => state.channels.fetching,
    getChannels: state => state.channels.channels,
    getIsError: state => state.channels.isError,
    getErrorMessage: state => state.channels.errorMessage,
    getCurrentChannel: state => state.channels.currentChannel,
}