import './Card.css';
import cn from 'classnames';

export function Card(props) {
    const {en, ru, isLearning, isTesting, onBlur} = props;
    const enClassName = cn('word-en', { 'completed': isTesting });

    return <div className='card'>
            <div className={enClassName}>{en}</div>
            {isLearning && <div className='word-en-translate'>{ru}</div>}
            {isTesting && <input type='text' className='input-translate' onBlur={onBlur}/>}
    </div>
}