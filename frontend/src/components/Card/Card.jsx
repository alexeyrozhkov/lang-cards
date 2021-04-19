import './Card.css';
import cn from 'classnames';

export function Card(props) {
    const {en, ru, isLearning, isTesting, onBlur, learnAword} = props;
    const enClassName = cn('word-en', { 'completed': isTesting });

    return <div className='card' onClick={learnAword}>
            <div className={enClassName}>{en}</div>
            {isLearning && <div className='word-en-translate'>{ru}</div>}
            {isTesting && <input type='text' className='input-translate' onBlur={onBlur}/>}
    </div>
}