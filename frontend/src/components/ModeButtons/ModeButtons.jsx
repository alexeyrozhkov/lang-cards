import './ModeButtons.css';

export function ModeButtons(props) {
    const {chooseTesting, chooseLearning} = props;

    return <div className='button-group'>
        <button className='button-choose practice' onClick={chooseTesting}>Test</button>
        <button className='button-choose traning' onClick={chooseLearning}>Learn</button>
    </div>
}