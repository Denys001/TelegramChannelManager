export default {
    createPost: (channel, inArchieve)=> ({type: 'POSTS/CREATE', payload: {channel, inArchieve}}),
    posts: (channel, pageNumber)=> ({type: 'POSTS/GET', payload: {channel, pageNumber}}),
    setFetching: (value)=> ({type: 'POSTS/SET/FETCHING', payload: {fetching: value}}),
    setCurrentPostText: (value)=> ({type: 'POSTS/SET/CURRENT/POST/TEXT', payload: {currentPostText: value}}),
    setIsButtonDisabled: (value)=> ({type: 'POSTS/SET/BUTTON/DISABLED', payload: {isButtonDisabled: value}}),
    setImage: (value)=> ({type: 'POSTS/SET/IMAGE', payload: {image: value, isButtonDisabled: false}}),
    setPosts: (value)=> ({type: 'POSTS/SET/', payload: { items: value }}),
    setTotalCount: (value)=> ({type: 'POSTS/SET/TotalCount', payload: { totalItemsCount: value }}),
    setCurrentPage: (value)=> ({type: 'POSTS/SET/CurrentPage', payload: { currentPage: value }}),
    dublicate: (channel, message)=> ({type: 'POSTS/DUBLICATE', payload: { channel, message }}),
    delete: (message)=> ({type: 'POSTS/DELETE', payload: { message}}),
    trash: (message)=> ({type: 'POSTS/TRASH', payload: { message}}),
    archive: (message)=> ({type: 'POSTS/ARCHIVE', payload: { message}}),
    copyToArchive: (message)=> ({type: 'POSTS/ARCHIVE/COPY', payload: { message}}),
    show: (id)=> ({type: 'POSTS/SHOW', payload: { id}}),
    setCurrentPost: (value) => ({type: 'POSTS/SET/CURRENT', payload: { currentPost: value}})
}