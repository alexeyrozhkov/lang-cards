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
                const result = processWords([...state.words_verbs], [...state.completed_words_verbs], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(completed === undefined) {
                    return {
                        ...state,
                        words_verbs: uncompleted
                    }
                }
                
                return {
                    ...state,
                    words_verbs: uncompleted,
                    completed_words_verbs: completed
                }
            }
            
            if(state.current_theme === 'theme_nouns') {
                const result = processWords([...state.words_nouns], [...state.completed_words_nouns], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(completed === undefined) {
                    return {
                        ...state,
                        words_nouns: uncompleted
                    }
                }
                return {
                    ...state,
                    words_nouns: uncompleted,
                    completed_words_nouns: completed
                }
            }

            if(state.current_theme === 'theme_prepositions') {
                const result = processWords([...state.words_prepositions], [...state.completed_words_prepositions], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(completed === undefined) {
                    return {
                        ...state,
                        words_prepositions: uncompleted
                    }
                }
                return {
                    ...state,
                    words_prepositions: uncompleted,
                    completed_words_prepositions: completed
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

function processWords(uncompleted, completed, id) {
    const indexWord = uncompleted.findIndex(word => word.id === id);
    const word = uncompleted.find(word => word.id === id);
    word.count+=1;
    if(word.count === 5) {
        const uncompletedWords = [...uncompleted]
        uncompletedWords.splice(indexWord, 1);
        const completedWords = [...completed, word];
        return {
            completed: completedWords,
            uncompleted: uncompletedWords
        }
    }
    uncompleted.splice(indexWord, 1);
    const updatedWords = [...uncompleted, word];
    return {
        uncompleted: updatedWords
    }
}
