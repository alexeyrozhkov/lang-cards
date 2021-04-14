const initialState = {
    words: []
};

export function reducer(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_WORDS': {
            const {words} = action.payload;
            return {
                ...state,
                words: words
            }
        }
        default:
            return state;
    }
}
