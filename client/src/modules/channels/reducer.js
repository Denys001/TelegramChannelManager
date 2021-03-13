const initialState = {
    channels: [],
    code: null,
    fetching: false,
    isError: false,
    errorMessage: '',
    currentChannel: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "CHANNELS/GENERATE/CODE":
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 5; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return { ...state, code: result }
        case "CHANNELS/SET/FETCHING":
            return { ...state, ...payload}
        case "CHANNELS/SET/CHANNELS":
            return { ...state, ...payload}
        case "CHANNELS/SET/ISERROR":
            return { ...state, ...payload}
        case "CHANNELS/SET/ERROR/MESSAGE":
            return { ...state, ...payload}
        case "CHANNELS/SET/CURRENT/CHANNEL":
            return { ...state, ...payload}
        default:
            return state
    }
}
