export default {
    createPost: (channel)=> ({type: 'POSTS/CREATE', payload: {channel}}),
    posts: (channel, pageNumber)=> ({type: 'POSTS/GET', payload: {channel, pageNumber}}),
    setFetching: (value)=> ({type: 'POSTS/SET/FETCHING', payload: {fetching: value}}),
    setCurrentPostText: (value)=> ({type: 'POSTS/SET/CURRENT/POST/TEXT', payload: {currentPostText: value}}),
    setIsButtonDisabled: (value)=> ({type: 'POSTS/SET/BUTTON/DISABLED', payload: {isButtonDisabled: value}}),
    setImage: (value)=> ({type: 'POSTS/SET/IMAGE', payload: {image: value, isButtonDisabled: false}}),
    setPosts: (value)=> ({type: 'POSTS/SET/', payload: { items: value }}),
    setTotalCount: (value)=> ({type: 'POSTS/SET/TotalCount', payload: { totalItemsCount: value }}),
    setCurrentPage: (value)=> ({type: 'POSTS/SET/CurrentPage', payload: { currentPage: value }}),
}