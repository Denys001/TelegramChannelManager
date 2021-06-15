export default {
    posts: (channel, pageNumber) => ({type: 'TRASH/GET', payload: {channel, pageNumber}}),
    setFetching: (value) => ({type: 'TRASH/SET/FETCHING', payload: {fetching: value}}),
    setPosts: (value) => ({type: 'TRASH/SET/', payload: { items: value }}),
    setTotalCount: (value) => ({type: 'TRASH/SET/TotalCount', payload: { totalItemsCount: value }}),
    setCurrentPage: (value) => ({type: 'TRASH/SET/CurrentPage', payload: { currentPage: value }}),
    setCurrentPost: (value) => ({type: 'TRASH/SET/CURRENT', payload: { currentPost: value}}),
    delete: (message) => ({type: 'TRASH/DELETE', payload: { message }}),
    backToArchive: (message) => ({type: 'TRASH/BACK_TO_PUBLISHED', payload: { message }}),
    backToPublished: (message) => ({type: 'TRASH/BACK_TO_ARCHIVE', payload: { message }}),
}