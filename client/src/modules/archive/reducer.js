const initialState = {
    items: [],
    currentPage: 1,
    totalItemsCount: 1,
    pageSize: 9,
    fetching: false,
    currentPost: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ARCHIVE/SET/FETCHING':
        case 'ARCHIVE/SET/':
        case 'ARCHIVE/SET/TotalCount':
        case 'ARCHIVE/SET/CurrentPage':
        case 'ARCHIVE/SET/CURRENT':
            return { ...state, ...payload }
        default:
            return state
    }
}
