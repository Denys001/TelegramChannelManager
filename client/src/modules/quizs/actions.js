export default {
    setFetching: (value) => ({ type: 'QUIZS/SET/FETCHING', payload: {fetching: value}}),
    setQuestion: (value) => ({ type: 'QUIZS/SET/QUESTION', payload: {question: value}}),
    setOption: (value) => ({ type: 'QUIZS/SET/OPTION', payload: {option: value}}),
    editOption: (id, value) => ({ type: 'QUIZS/EDIT/OPTION', payload: {id, value}}),
    deleteOption: (value) => ({ type: 'QUIZS/DELETE/OPTION', payload: {index: value}}),
    setExplanation: (value) => ({ type: 'QUIZS/SET/EXPLANATION', payload: {explanation: value}}),
    setTypeQuiz: () => ({ type: 'QUIZS/SET/TYPE', payload: {type: "quiz"}}),
    setTypeDefualt: () => ({ type: 'QUIZS/SET/TYPE', payload: {type: "default"}}),
    setCorrectOptionId: (value) => ({ type: 'QUIZS/SET/CORRECT_OPTION_ID', payload: {correct_option_id: value}}),
    create: () => ({ type: 'QUIZS/CREATE', payload: {inArchive: false}}),
    createInArchive: () => ({ type: 'QUIZS/CREATE', payload: {inArchive: true}}),
    setInitialState: () => ({ type: 'QUIZS/SET/INITIAL_STATE', payload: {}}),
}