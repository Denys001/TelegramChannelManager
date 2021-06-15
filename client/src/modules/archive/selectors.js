export default {
    getToken: (state) => state.auth.token,
    getChannels: (state) => state.channels.channels,
    getFetching: (state) => state.archive.fetching,
    getPosts: (state) => state.archive.items,
    getCurrentPage: (state) => state.archive.currentPage,
    getTotalItemsCount: (state) => state.archive.totalItemsCount,
    getPageSize: (state) => state.archive.pageSize,
    getCurrentChannel: (state) => state.channels.currentChannel,
    getCurrentPost: (state) => state.archive.currentPost,
}