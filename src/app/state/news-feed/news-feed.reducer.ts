export function newsFeedReducer(state, action) {
    switch(action.type) {
        case 'CATEGORY_CHANGE':
            console.log('existing state: ' + JSON.stringify(state))
            console.log('payload :' + action.payload)
            return {
                ...state,
                category: action.payload
            }
    }
}