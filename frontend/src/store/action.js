/**
 * 
 * @param {string} words 
 */
 export function loadWordsActionCreator(words) {
    return {
        type: 'LOAD_WORDS',
        payload: { 
            words: words
        }
    }
}


/**
 * 
 * @param {string} id
 */

export function learnAword(id) {
    return {
        type: 'LEARN_A_WORD',
        payload: {
            id: id
        }
    }
}

/**
 * 
 * @param {string} theme
 */

export function setCurrentThemeAC(theme) {
    return {
        type: 'SET_CURRENT_THEME',
        payload: {
            theme: theme
        }
    }
}