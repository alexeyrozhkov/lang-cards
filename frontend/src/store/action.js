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