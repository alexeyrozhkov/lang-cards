import './SelectVocabulary.css';

export function SelectVocabulary(props) {
    const {loadVerbs, loadNouns, loadPrepositions} = props;

    return <div className='buttons-category'>
        <button className='button-category verbs' onClick={loadVerbs}>Verbs</button>
        <button className='button-category' onClick={loadNouns}>Nouns</button>
        <button className='button-category prepositions' onClick={loadPrepositions}>Prepositions</button>
    </div>
}
