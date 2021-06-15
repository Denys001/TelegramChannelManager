export default {
    getToken: (state) => state.auth.token,
    getChannels: (state) => state.channels.channels,
    getFetching: (state) => state.trash.fetching,
    getPosts: (state) => state.trash.items,
    getCurrentPage: (state) => state.trash.currentPage,
    getTotalItemsCount: (state) => state.trash.totalItemsCount,
    getPageSize: (state) => state.trash.pageSize,
    getCurrentChannel: (state) => state.channels.currentChannel,
    getCurrentPost: (state) => state.trash.currentPost,
}