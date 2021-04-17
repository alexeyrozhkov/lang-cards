import './ModeButtons.css';

export function ModeButtons(props) {
    const {choosePractice, chooseTraining} = props;

    return <div className='button-group'>
        <button className='button-choose practice' onClick={choosePractice}>Test</button>
        <button className='button-choose traning' onClick={chooseTraining}>Learn</button>
    </div>
}