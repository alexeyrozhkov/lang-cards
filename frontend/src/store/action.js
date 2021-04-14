/**
 * 
 * @param {string} task 
 */
 export function loadWordsActionCreator(tasks) {
    return {
        type: 'LOAD_WORDS',
        payload: { 
            tasks: tasks
        }
    }
}