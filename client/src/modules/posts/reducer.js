const initialState = {
    items: [],
    currentPage: 1,
    totalItemsCount: 1,
    pageSize: 9,
    fetching: false,
    currentPostText: '',
    isButtonDisabled: true,
    image: null, 
    currentPost: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'POSTS/SET/CURRENT/POST/TEXT':
            var content = payload.currentPostText
            content = content.replaceAll('<p>', '')
            content = content.replaceAll('</p>', '')
            content = content.replaceAll(/(<ul>\n)/g, '')
            content = content.replaceAll('</ul>\n', '')
            content = content.replaceAll('<li>', '- ')
            content = content.replaceAll('</li>', '')
            content = content.replaceAll(/<span[^>]*>/g, '')
            content = content.replaceAll('</span>', '')
            content = content.replaceAll('&nbsp', '')
            content = content.replaceAll(/ style="[^"]*"/g, '')
            content = content.replaceAll('</span>', '')
            content = content.replaceAll('<p>', '')
            content = content.trim()
            var disabled = true
            if (content !== '') {
                disabled = false
            }
            return { ...state, ...payload, isButtonDisabled: disabled }
        case 'POSTS/SET/FETCHING':
        case 'POSTS/SET/BUTTON/DISABLED':
        case 'POSTS/SET/IMAGE':
        case 'POSTS/SET/':
        case 'POSTS/SET/TotalCount':
        case 'POSTS/SET/CurrentPage':
        //case 'POSTS/DUBLICATE':
        //case 'POSTS/TRASH':
        //case 'POSTS/DELETE':
        case 'POSTS/SET/CURRENT':
            return { ...state, ...payload }
        default:
            return state
    }
}
