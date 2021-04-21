import {loadWordsActionCreator, setCurrentThemeAC} from './action';

const url = 'http://localhost:3030';

export function loadWords(type,theme) {
    return function (dispatch) {
        fetch(`${url}/${type}`)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then((data) => data.json())
        .then((data) => {
            dispatch(setCurrentThemeAC(theme))
            dispatch(loadWordsActionCreator(data))
        })
        .catch(e => console.error(e))
    }
    
}