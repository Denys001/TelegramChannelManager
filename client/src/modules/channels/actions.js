export default {
    generateCode: ()=>({type: "CHANNELS/GENERATE/CODE"}),
    setFetching: (value)=>({type: "CHANNELS/SET/FETCHING", payload: {fetching: value}}),
    setChannels: (channels)=>({type: "CHANNELS/SET/CHANNELS", payload: {channels}}),
    setCodeNULL: ()=>({type: "CHANNELS/SET/CODE/NULL", payload: {code: null}}),
    edit: (name, description, photo)=>({type: "CHANNELS/EDIT/CHANNELS", payload: {name, description, photo}}),
    delete: ()=>({type: "CHANNELS/DELETE/CHANNELS", payload: {}}),
    loadChannels: ()=>({type: 'CHANNELS/LOAD/CHANNELS'}),
    addChannels: ()=>({type: 'CHANNELS/ADD/CHANNELS'}),
    setIsError: (value)=>({type: 'CHANNELS/SET/ISERROR', payload: { isError: value}}),
    setErrorMessage: (value)=>({type: 'CHANNELS/SET/ERROR/MESSAGE', payload: { errorMessage: value}}),
    setCurrentChannel: (value)=>({type: 'CHANNELS/SET/CURRENT/CHANNEL', payload: { currentChannel: value}}),
}