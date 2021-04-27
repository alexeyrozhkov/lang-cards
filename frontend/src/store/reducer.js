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

const themeMap = {
    theme_verbs: 'verbs',
    theme_nouns: 'nouns',
    theme_prepositions: 'prepositions'
}

function getStateAfterProcessWord(theme, id, state) {
    const field = themeMap[theme];
    const result = processWord([...state[field].uncompleted], [...state[field].completed], id);
    const completed = result.completed;
    const uncompleted = result.uncompleted;
    if(!completed) {
        return {
            ...state,
            verbs: {...state[field], uncompleted: uncompleted}
        }
    }
    
    return {
        ...state,
        verbs: {...state[field], uncompleted: uncompleted, completed: completed}
    }
}


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

            return getStateAfterProcessWord(state.current_theme, id, state);
        }

        case 'TEST_DONE': {
            const {id} = action.payload;
            if(state.current_theme === 'theme_verbs') {
                const completed = testDone([...state.verbs.completed], id).completed;
                return {
                    ...state,
                    verbs: {...state.verbs, completed: completed}
                }
            }
            if(state.current_theme === 'theme_nouns') {
                const completed = testDone([...state.nouns.completed], id).completed;
                return {
                    ...state,
                    nouns: {...state.nouns, completed: completed}
                }
            }
            if(state.current_theme === 'theme_prepositions') {
                const completed = testDone([...state.prepositions.completed], id).completed;
                return {
                    ...state,
                    prepositions: {...state.prepositions, completed: completed}
                }
            }
        }

        case 'TEST_FAILED': {
            const {id} = action.payload;
            if(state.current_theme === 'theme_verbs') {
                const completed = testFailed([...state.verbs.completed], id).completed;
                return {
                    ...state,
                    verbs: {...state.verbs, completed: completed}
                }
            }
            if(state.current_theme === 'theme_nouns') {
                const completed = testFailed([...state.nouns.completed], id).completed;
                return {
                    ...state,
                    nouns: {...state.nouns, completed: completed}
                }
            }
            if(state.current_theme === 'theme_prepositions') {
                const completed = testFailed([...state.prepositions.completed], id).completed;
                return {
                    ...state,
                    prepositions: {...state.prepositions, completed: completed}
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

function processWord(uncompleted, completed, id) {
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

function testDone(completed, id) {
    console.log('вход');
    const indexWord = completed.findIndex(word => word.id === id);
    const completedWords = [...completed];
    completedWords.splice(indexWord, 1);
    return {
        completed: completedWords
    }
}

function testFailed(completed, id) {
    const indexWord = completed.findIndex(word => word.id === id);
    const word = completed.find(word => word.id === id);
    completed.splice(indexWord, 1);
    const updatedWords = [...completed, word];
    return {
        completed: updatedWords
    }
}