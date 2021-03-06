const initialState = {
    items: [],
    currentPage: 1,
    totalItemsCount: 1,
    pageSize: 9,
    fetching: false,
    currentPostText: '',
    isButtonDisabled: true,
    image: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'POSTS/SET/FETCHING':
            return { ...state, ...payload }
        case 'POSTS/SET/CURRENT/POST/TEXT':
            var content = payload.currentPostText
            content = content.replaceAll('<p>', '')
            content = content.replaceAll('</p>', '')
            content = content.replaceAll(/(<ul>\n)/g, '')
            content = content.replaceAll('</ul>\n', '')
            content = content.replaceAll('<li>', '- ')
            content = content.replaceAll('</li>', '')
            content = content.trim()
            var disabled = true
            if(content !== ''){
                disabled = false
            }
            return { ...state, ...payload, isButtonDisabled: disabled  }
        case 'POSTS/SET/BUTTON/DISABLED':
            return { ...state, ...payload }
        case 'POSTS/SET/IMAGE':
            return { ...state, ...payload }
        case 'POSTS/SET/':
            return { ...state, ...payload }
        case 'POSTS/SET/TotalCount':
            return { ...state, ...payload }
        case 'POSTS/SET/CurrentPage':
            return { ...state, ...payload }

        default:
            return state
    }
}
