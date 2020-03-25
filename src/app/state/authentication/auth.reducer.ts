export function authReducer(state, action) {
    switch(action.type) {
        case 'SIGN_IN':
            console.log('existing state: ' + JSON.stringify(state))
            console.log('payload :' + action.payload)
            return {
                ...state,
                isSignedIn:action.payload
            }
    }
}