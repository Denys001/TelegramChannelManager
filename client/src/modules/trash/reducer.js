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
        case 'TRASH/SET/FETCHING':
        case 'TRASH/SET/':
        case 'TRASH/SET/TotalCount':
        case 'TRASH/SET/CurrentPage':
        case 'TRASH/SET/CURRENT':
            return { ...state, ...payload }
        default:
            return state
    }
}
