export default {
    createPost: (channel)=> ({type: 'POSTS/CREATE', payload: {channel}}),
    setFetching: (value)=> ({type: 'POSTS/SET/FETCHING', payload: {fetching: value}}),
    setCurrentPostText: (value)=> ({type: 'POSTS/SET/CURRENT/POST/TEXT', payload: {currentPostText: value}}),
    setIsButtonDisabled: (value)=> ({type: 'POSTS/SET/BUTTON/DISABLED', payload: {isButtonDisabled: value}}),
    setImage: (value)=> ({type: 'POSTS/SET/IMAGE', payload: {image: value}}),
}