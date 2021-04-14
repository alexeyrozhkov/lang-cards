import {loadWordsActionCreator} from './action';

const url = 'http://localhost:3030';

export function loadWords(type) {
    return function (dispatch) {
        fetch(`${url}/${type}`)
    }
}