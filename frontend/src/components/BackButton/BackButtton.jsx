import './BackButton.css';

export function BackButton(props) {
    const {disabled, clickBack} = props;
    return <button className='button-back' disabled={disabled} onClick={clickBack}><p className='arrow'>↶</p> Назад</button>
}