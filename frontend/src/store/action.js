/**
 * 
 * @param {string} task 
 */
 export function loadWordsActionCreator(words) {
    return {
        type: 'LOAD_WORDS',
        payload: { 
            words: words
        }
    }
}

export function clearWords() {
    return {
        type: 'CLEAR_WORDS'
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