import './Card.css';
import cn from 'classnames';

export function Card(props) {
    const {en, ru, isTraning, isPractice, onBlur} = props;
    const enClassName = cn('word-en', { 'completed': isPractice });

    return <div className='card'>
            <div className={enClassName}>{en}</div>
            {isTraning && <div className='word-en-translate'>{ru}</div>}
            {isPractice && <input type='text' className='input-translate' onBlur={onBlur}/>}
    </div>
}