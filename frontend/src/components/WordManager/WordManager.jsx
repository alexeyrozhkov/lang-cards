import './WordManager.css';
import React from 'react';
import {loadWords} from '../../store/middleware';
import {learnAword} from '../../store/action'
import { connect } from 'react-redux';
import {Card} from '../Card/Card.jsx';
import {ModeButtons} from '../ModeButtons/ModeButtons.jsx';
import {SelectVocabulary} from '../SelectVocabulary/SelectVocabulary.jsx';


const verbsLink = 'verbs';
const nounsLink = 'nouns';
const prepositionsLink = 'prepositions';

const modeLearn = 'learn';
const modeTest = 'test';

const theme_verbs = 'theme_verbs';
const theme_nouns = 'theme_nouns';
const theme_prepositions = 'theme_prepositions'




class WordManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'modebuttons',
            mode: ''
        }
        this.loadWordsType = this.loadWordsType.bind(this);
        this.chooseMode = this.chooseMode.bind(this);
        this.handleLearnAword = this.handleLearnAword.bind(this);
        this.renderThemeWords = this.renderThemeWords.bind(this);
    }

    loadWordsType(type, theme) {
        this.props.loadWords(type, theme);
        this.setState({screen: 'cards'})
    }

    chooseMode(mode) {
        this.setState({
            screen: 'select-vocsbulary',
            mode: mode
        })
        
    }

    handleLearnAword(id) {
        {this.state.mode === 'learn' && this.props.learnAword(id)}
    }

    renderThemeWords(param) {
        switch(param) {
            case 'theme_verbs': {
                return this.props.words_verbs.slice(0, 5).map(word => 
                    <Card
                        key={word.en}
                        en={word.en}
                        ru={word.ru}
                        mode = {this.state.mode}
                        learnAword={() => this.handleLearnAword(word.id)}
                    />)
            }
            case 'theme_nouns': {
                return this.props.words_nouns.slice(0, 5).map(word => 
                    <Card
                        key={word.en}
                        en={word.en}
                        ru={word.ru}
                        mode = {this.state.mode}
                        learnAword={() => this.handleLearnAword(word.id)}
                    />)
            }
            case 'theme_prepositions': {
                return this.props.words_prepositions.slice(0, 5).map(word => 
                    <Card
                        key={word.en}
                        en={word.en}
                        ru={word.ru}
                        mode = {this.state.mode}
                        learnAword={() => this.handleLearnAword(word.id)}
                    />)
            }
            
        }
    }


    render() {
        return (
            <div className='main'>
                {this.state.screen === 'modebuttons' && <ModeButtons chooseTesting={() => this.chooseMode(modeTest)} chooseLearning={() => this.chooseMode(modeLearn)}/>}
                {this.state.screen === 'select-vocsbulary' && 
                <SelectVocabulary
                    loadVerbs = {() => this.loadWordsType(verbsLink, theme_verbs)}
                    loadNouns = {() => this.loadWordsType(nounsLink, theme_nouns)}
                    loadPrepositions = { () => this.loadWordsType(prepositionsLink, theme_prepositions)}
                />}
               <div className="cards-wrapper">
                    {this.state.screen === 'cards' && this.renderThemeWords(this.props.current_theme)}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        current_theme: state.current_theme,
        words_verbs: state.words_verbs,
        words_nouns: state.words_nouns,
        words_prepositions: state.words_prepositions,
        completed_words_verbs: state.completed_words_verbs,
        completed_words_nouns: state.completed_words_nouns,
        completed_words_prepositions: state.completed_words_prepositions
    }
}

const mapDispatchToProps = {
    loadWords: loadWords,
    learnAword: learnAword
}

const WordManager = connect(mapStateToProps, mapDispatchToProps)(WordManagerComponent);
export {WordManager};