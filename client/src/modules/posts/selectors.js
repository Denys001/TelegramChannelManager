export default {
    getToken: (state) => state.auth.token,
    getContent: (state) => state.posts.currentPostText,
    getImage: (state) => state.posts.image,
    getChannels: (state) => state.channels.channels,
    getIsButtonDisabled: (state) => state.posts.isButtonDisabled,
    getFetching: (state) => state.posts.fetching,
}