const initialState = {
    items: [
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
        "fddffd",
    ],
    currentPage: 1,
    totalItemsCount: 12,
    fetching: false, 
    currentPostText: ''
}
const SET = 'SET POST'
const SET_POST_TEXT = 'SET POST TEXT'

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET:
            return { ...state, ...payload }
        case SET_POST_TEXT:
            return { ...state, ...payload }

        default:
            return state
    }
}

export const set = (value) => ({ type: SET, payload: value })
export const setCurrentPostText = (value) => ({ type: SET_POST_TEXT, payload: { currentPostText: value } })
export const loadPost = (pageNumber, amount) => {
    return (dispatch) => {

    }
}