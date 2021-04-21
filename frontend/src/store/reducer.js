const initialState = {
    current_theme: '',
    words_verbs: [],
    words_nouns: [],
    words_prepositions: [],
    completed_words_verbs: [],
    completed_words_nouns: [],
    completed_words_prepositions: []
};


export function reducer(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_WORDS': {
            const {words} = action.payload;
            words.map(word => {
                word.count = 0;
                word.id = word.en;
            })

            if(state.current_theme === 'theme_verbs') {
                return {
                    ...state,
                    words_verbs: words
                }
            }
            if(state.current_theme === 'theme_nouns') {
                return {
                    ...state,
                    words_nouns: words
                }
            }
            if(state.current_theme === 'theme_prepositions') {
                return {
                    ...state,
                    words_prepositions: words
                }
            }
        }
    
        case 'LEARN_A_WORD': {
            const {id} = action.payload;

            if(state.current_theme === 'theme_verbs') {
                const word = state.words_verbs.find(word => word.id === id);
                word.count+=1;
                const indexWord = state.words_verbs.findIndex(word => word.id === id);
                state.words_verbs.splice(indexWord, 1);
                const updatedWords = [...state.words_verbs, word];
                return {
                    ...state,
                    words_verbs: updatedWords
                }
            }
            
            if(state.current_theme === 'theme_nouns') {
                const word = state.words_nouns.find(word => word.id === id);
                word.count+=1;
                const indexWord = state.words_nouns.findIndex(word => word.id === id);
                state.words_nouns.splice(indexWord, 1);
                const updatedWords = [...state.words_nouns, word];
                return {
                    ...state,
                    words_nouns: updatedWords
                }
            }

            if(state.current_theme === 'theme_prepositions') {
                const word = state.words_prepositions.find(word => word.id === id);
                word.count+=1;
                const indexWord = state.words_prepositions.findIndex(word => word.id === id);
                state.words_prepositions.splice(indexWord, 1);
                const updatedWords = [...state.words_prepositions, word];
                return {
                    ...state,
                    words_prepositions: updatedWords
                }
            }
            
    
            

           
        }
        case 'SET_CURRENT_THEME': {
            const {theme} = action.payload;
            return {
                ...state,
                current_theme: theme
            }
        }
        default:
            return state;
    }
}

