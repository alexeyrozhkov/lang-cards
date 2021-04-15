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

class WordManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateWords: this.props.words,
            screen: 'modebuttons',
            isPractice: false,
            isTraining: false
        }
        this.choosePractice = this.choosePractice.bind(this);
        this.chooseTraining = this.chooseTraining.bind(this);
        this.loadWordsType = this.loadWordsType.bind(this);
    }

    loadWordsType(type) {
        {this.props.words.length && this.props.clearWords()}
        this.props.loadWords(type);
    }

    choosePractice() {
        this.setState({
            isTraining: false,
            isPractice: true,
            screen: 'select-vocsbulary'
        })
    }
    chooseTraining() {
        this.setState({
            isTraining: true,
            isPractice: false,
            screen: 'select-vocsbulary'
        })
    }

    render() {
        return (
            <div className='main'>
                {this.state.screen === 'modebuttons' && <ModeButtons choosePractice={this.choosePractice} chooseTraining={this.chooseTraining}/>}
                {this.state.screen === 'select-vocsbulary' && 
                <SelectVocabulary
                    loadVerbs = {() => this.loadWordsType(verbsLink)}
                    loadNouns = {() => this.loadWordsType(nounsLink)}
                    loadPrepositions = { () => this.loadWordsType(prepositionsLink)}
                />}
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