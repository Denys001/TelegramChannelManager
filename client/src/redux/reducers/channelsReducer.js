import { channelAPI } from '../../api/api'

const initialState = {
    channels: [],
    code: null,
    fetching: false
}
const GENERATECODE = 'generateCode'
const NULLCODE = 'nullCode'
const SET = 'SET'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GENERATECODE:
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 5; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return { ...state, code: result }
        case NULLCODE:
            return { ...state, ...payload }
        case SET:
            return { ...state, ...payload }
        default:
            return state
    }
}

export const generateCode = () => ({ type: GENERATECODE })
export const set = (value) => ({ type: SET, payload: value })
export const setErrorNull = () => ({ type: SET, payload: {error: false, errorMessage: ''} })

export const loadChannels = (token) => {
    return async (dispatch) => {
        dispatch(set({ fetching: true }))
        const channels = await channelAPI.channels(token)
        dispatch(set({ channels: channels.channels }))
        dispatch(set({ fetching: false }))
    }
}
export const addChannels = (code, token) => {
    return async (dispatch) => {
        dispatch(set({ fetching: true }))
        const add_result = await channelAPI.add(code, token)
        if(add_result.ResultCode === 0){
            const channels = await channelAPI.channels(token)
            dispatch(set({ channels: channels.channels }))
            dispatch(set({ code: null }))
        }
        dispatch(set({ fetching: false }))
        if(add_result.ResultCode === 1){
            return add_result.message
        }
        
    }
}