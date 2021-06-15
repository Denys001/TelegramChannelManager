export default {
    posts: (channel, pageNumber) => ({type: 'ARCHIVE/GET', payload: {channel, pageNumber}}),
    setFetching: (value) => ({type: 'ARCHIVE/SET/FETCHING', payload: {fetching: value}}),
    setPosts: (value) => ({type: 'ARCHIVE/SET/', payload: { items: value }}),
    setTotalCount: (value) => ({type: 'ARCHIVE/SET/TotalCount', payload: { totalItemsCount: value }}),
    setCurrentPage: (value) => ({type: 'ARCHIVE/SET/CurrentPage', payload: { currentPage: value }}),
    setCurrentPost: (value) => ({type: 'ARCHIVE/SET/CURRENT', payload: { currentPost: value}}),
    delete: (message) => ({type: 'ARCHIVE/DELETE', payload: { message }}),
    trash: (message)=> ({type: 'ARCHIVE/TRASH', payload: { message}}),
    unarchive: (message)=> ({type: 'ARCHIVE/UNARCHIVE', payload: { message}}),
    copyAndUnarchive: (message)=> ({type: 'ARCHIVE/UNARCHIVE/COPY', payload: { message}}),
}