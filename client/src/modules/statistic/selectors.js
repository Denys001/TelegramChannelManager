export default {
    getFetching: (state) => state.statistic.fetching,
    getData: (state) => state.statistic.data,
    getPostAmount: (state) => state.statistic.postAmount,
    getToken: (state) => state.auth.token,
    getCurrentChannel: (state) => state.channels.currentChannel,
}