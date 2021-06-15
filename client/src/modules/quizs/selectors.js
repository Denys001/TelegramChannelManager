export default {
    getFetching: (state) => state.statistic.fetching,
    getToken: (state) => state.auth.token,
    getQuestion: (state) => state.quizs.question,
    getOptions: (state) => state.quizs.options,
    getExplanation: (state) => state.quizs.explanation,
    getType: (state) => state.quizs.type,
    getCorrectOptionId: (state) => state.quizs.correct_option_id,
    getCurrentChannel: (state) => state.channels.currentChannel,
}