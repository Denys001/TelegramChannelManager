import {postAPI} from '../../api/api'
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
    currentPostText: '',
    buttonDisable: true,
    image: null
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
export const setCurrentPostText = (value) => ({ type: SET_POST_TEXT, payload: { currentPostText: value, buttonDisable: false } })
export const setImage = (value) => ({ type: SET, payload: { image: value } })
export const create = (token, channel, content, image) => {
    return  async (dispatch) => {
        content = content.replaceAll('<p>', '')
        content = content.replaceAll('</p>', '')
        content = content.replaceAll(/(<ul>\n)/g, '')
        content = content.replaceAll('</ul>\n', '')
        content = content.replaceAll('<li>', '- ')
        content = content.replaceAll('</li>', '')
        //content = content.replaceAll(/(\n\n)/g, '')
        const result = await postAPI.create(token, content, channel, image)
        dispatch(set({currentPostText: '', buttonDisable: true, image: {}}))
    }
}