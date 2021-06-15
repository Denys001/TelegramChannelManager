const initialState = {
    data: null,
    postAmount: 0,
    fetching: false,
    amounOfSubscribers: 0,
    avgPostInMonth: 0,
    dateOfTheFirstPost: 0, 
    dateOfTheLastPost: 0, 
    postsCurrentYearData: [], 
    postsEveryDayData: [], 
    archiveAmount: 0,
    trashAmount: 0,
    amounOfDefaultPosts: 0,
    amounOfQuizPosts: 0,
    postsLastMonthData: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'STATISTIC/SET/FETCHING':
        return { ...state, ...payload }
    case 'STATISTIC/SET/DATA':
        return { ...state, ...payload }

    default:
        return state
    }
}
