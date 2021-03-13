export default {
    load: () => ({ type: 'STATISTIC/LOAD', payload: {}}),
    setFetching: (value) => ({ type: 'STATISTIC/SET/FETCHING', payload: {fetching: value}}),
    setStatistic: (statistic) => (
        { 
            type: 'STATISTIC/SET/DATA', 
            payload: { ...statistic }
        }
    ),
}