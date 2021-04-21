import './Card.css';
import cn from 'classnames';

export function Card(props) {
    const {en, ru, onBlur, learnAword, mode} = props;
    const enClassName = cn('word-en', { 'completed': mode === 'test' });

    return <div className='card' onClick={learnAword}>
            <div className={enClassName}>{en}</div>
            {mode === 'learn' && <div className='word-en-translate'>{ru}</div>}
            {mode === 'test' && <input type='text' className='input-translate' onBlur={onBlur}/>}
    </div>
}