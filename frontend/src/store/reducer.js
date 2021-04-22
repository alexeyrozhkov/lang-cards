const initialState = {
    current_theme: '',
    verbs: {
        completed: [],
        uncompleted: []
    },
    nouns: {
        completed: [],
        uncompleted: []
    },
    prepositions: {
        completed: [],
        uncompleted: []
    }
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
                if(state.verbs.uncompleted.length) {
                    return {
                        ...state
                    }
                }
                return {
                    ...state,
                    verbs: { ...state.verbs, uncompleted: words}
                }
            }
            if(state.current_theme === 'theme_nouns') {
                if(state.nouns.uncompleted.length) {
                    return {
                        ...state
                    }
                }
                return {
                    ...state,
                    nouns: {...state.verbs, uncompleted: words}
                }
            }
            if(state.current_theme === 'theme_prepositions') {
                if(state.prepositions.uncompleted.length) {
                    return {
                        ...state
                    }
                }
                return {
                    ...state,
                    prepositions: {...state.prepositions, uncompleted: words}
                }
            }
        }
    
        case 'LEARN_A_WORD': {
            
            const {id} = action.payload;

            if(state.current_theme === 'theme_verbs') {
                const result = processWords([...state.verbs.uncompleted], [...state.verbs.completed], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(!completed) {
                    return {
                        ...state,
                        verbs: {...state.verbs, uncompleted: uncompleted}
                    }
                }
                
                return {
                    ...state,
                    verbs: {...state.verbs, uncompleted: uncompleted, completed: completed}
                }
            }
            
            if(state.current_theme === 'theme_nouns') {
                const result = processWords([...state.nouns.uncompleted], [...state.nouns.completed], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(!completed) {
                    return {
                        ...state,
                        nouns: {...state.nouns, uncompleted: uncompleted}
                    }
                }
                return {
                    ...state,
                    nouns: {...state.nouns, uncompleted: uncompleted, completed: completed}
                }
            }

            if(state.current_theme === 'theme_prepositions') {
                const result = processWords([...state.prepositions.uncompleted], [...state.prepositions.completed], id);
                const completed = result.completed;
                const uncompleted = result.uncompleted;
                if(!completed) {
                    return {
                        ...state,
                        prepositions: {...state.prepositions, uncompleted: uncompleted}
                    }
                }
                return {
                    ...state,
                    prepositions: {...state.prepositions, uncompleted: uncompleted, completed: completed}
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
