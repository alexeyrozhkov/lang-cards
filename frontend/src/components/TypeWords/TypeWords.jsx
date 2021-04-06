import './TypeWords.css';

export function TypeWords(props) {
    const {chooseVerbs, chooseNouns, choosePrepositions} = props;
     return <div className='buttons-category'>
              <button className='button-category verbs' onClick={chooseVerbs}>Verbs</button>
              <button className='button-category' onClick={chooseNouns}>Nouns</button>
              <button className='button-category prepositions' onClick={choosePrepositions}>Prepositions</button>
     </div>
}