import './WordManager.css';
import React from 'react';
import {loadWords} from '../../store/middleware';
import {clearWords} from '../../store/action'
import { connect } from 'react-redux';
import {Card} from '../Card/Card.jsx';
import {ModeButtons} from '../ModeButtons/ModeButtons.jsx';
import {SelectVocabulary} from '../SelectVocabulary/SelectVocabulary.jsx';


const verbsLink = 'verbs';
const nounsLink = 'nouns';
const prepositionsLink = 'prepositions';

const modeLearn = 'learn';
const modeTest = 'test';




class WordManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'modebuttons',
            mode: ''
        }
        this.loadWordsType = this.loadWordsType.bind(this);
        this.chooseMode = this.chooseMode.bind(this);
    }

    loadWordsType(type) {
        {this.props.words.length && this.props.clearWords()}
        this.props.loadWords(type);
        this.setState({screen: 'cards'})
    }

    chooseMode(mode) {
        this.setState({
            screen: 'select-vocsbulary',
            mode: mode
        })
        
    }


    render() {
        return (
            <div className='main'>
                {this.state.screen === 'modebuttons' && <ModeButtons chooseTesting={() => this.chooseMode(modeTest)} chooseLearning={() => this.chooseMode(modeLearn)}/>}
                {this.state.screen === 'select-vocsbulary' && 
                <SelectVocabulary
                    loadVerbs = {() => this.loadWordsType(verbsLink)}
                    loadNouns = {() => this.loadWordsType(nounsLink)}
                    loadPrepositions = { () => this.loadWordsType(prepositionsLink)}
                />}
               <div className="cards-wrapper">
                    {this.state.screen === 'cards' && this.props.words.slice(0, 5).map(word => 
                        <Card
                            key={word.en}
                            en={word.en}
                            ru={word.ru}
                            isLearning={this.state.mode === 'learn'}
                            isTesting={this.state.mode === 'test'}
                        />)}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        words: state.words
    }
}

const mapDispatchToProps = {
    loadWords: loadWords,
    clearWords: clearWords
}

const WordManager = connect(mapStateToProps, mapDispatchToProps)(WordManagerComponent);
export {WordManager};