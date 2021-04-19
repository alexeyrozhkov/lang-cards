const initialState = {
    words: []
};


export function reducer(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_WORDS': {
            const {words} = action.payload;
            words.map(word => {
                word.count = 0;
                word.id = word.en;
            })
            return {
                ...state,
                words: words
            }
        }
        case 'CLEAR_WORDS': {
            return {
                ...state,
                words: []
            }
        }
        case 'LEARN_A_WORD': {
            const {id} = action.payload;
            const word = state.words.find(word => word.id === id);
            word.count+=1;
            const indexWord = state.words.findIndex(word => word.id === id);
            state.words.splice(indexWord, 1);
            const updatedWords = [...state.words, word];

            return {
                ...state,
                words: updatedWords
            }
        }
        default:
            return state;
    }
}

