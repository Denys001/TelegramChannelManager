const initialState = {
    fetching: false,
    question: '',
    options: [],
    type: 'default',
    correct_option_id: 0,
    explanation: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'QUIZS/SET/FETCHING':
        case 'QUIZS/SET/QUESTION':
        case 'QUIZS/SET/TYPE':
        case 'QUIZS/SET/CORRECT_OPTION_ID':
        case 'QUIZS/SET/EXPLANATION':
            return { ...state, ...payload }

        case 'QUIZS/SET/INITIAL_STATE': {
            const obj = {
                question: '',
                options: [],
                type: 'default',
                correct_option_id: 0,
                explanation: ''
            }
            return { ...state, ...obj }
        }
        case 'QUIZS/SET/OPTION': {
            const options = [...state.options, payload.option]
            return { ...state, options }
        }
        case 'QUIZS/EDIT/OPTION': {
            state.options[payload.id] = payload.value
            return { ...state, options: [...state.options] }
        }
        case 'QUIZS/DELETE/OPTION': {
            const options = state.options.filter((el, index) => index != payload.index)
            return { ...state, options }
        }
        default:
            return state
    }
}
