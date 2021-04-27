import './WordManager.css';
import React from 'react';
import {loadWords} from '../../store/middleware';
import {learnAword} from '../../store/action'
import { connect } from 'react-redux';
import {Card} from '../Card/Card.jsx';
import {ModeButtons} from '../ModeButtons/ModeButtons.jsx';
import {SelectVocabulary} from '../SelectVocabulary/SelectVocabulary.jsx';
import {BackButton} from '../BackButton/BackButtton.jsx';


const verbsLink = 'verbs';
const nounsLink = 'nouns';
const prepositionsLink = 'prepositions';

const modeLearn = 'learn';
const modeTest = 'test';

const theme_verbs = 'theme_verbs';
const theme_nouns = 'theme_nouns';
const theme_prepositions = 'theme_prepositions'

const themeMap = {
    theme_verbs: 'verbs',
    theme_nouns: 'nouns',
    theme_prepositions: 'prepositions'
}


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
        this.handleClickBack = this.handleClickBack.bind(this);
        this.renderCards = this.renderCards.bind(this);
    }
    
    loadWordsType(type, theme) {
       {this.state.mode === modeLearn &&  
        this.props.loadWords(type, theme);
        this.setState({screen: 'cards'}) }
    }

    chooseMode(mode) {
        this.setState({
            screen: 'select-vocabulary',
            mode: mode,
        })
        
    }
    handleLearnAword(id) {
        {this.state.mode === 'learn' && this.props.learnAword(id)}
    }
    renderCards(theme) {
        const field = themeMap[theme];
        if(this.state.mode === 'test') {
            return this.props[field].completed.slice(0, 5).map(word => 
                <Card
                    key={word.en}
                    en={word.en}
                    ru={word.ru}
                    mode = {this.state.mode}
                />)
        }
        if(this.state.mode === 'learn') {
            return this.props[field].uncompleted.slice(0, 5).map(word => 
                <Card
                    key={word.en}
                    en={word.en}
                    ru={word.ru}
                    mode = {this.state.mode}
                    learnAword={() => this.handleLearnAword(word.id)}
                />)
            
        }
    }
    renderThemeWords(param) {
        return this.renderCards(param)
    }
    handleClickBack() {
        if(this.state.screen === 'cards') {
            this.setState({screen: 'select-vocabulary'})
        }
        if(this.state.screen === 'select-vocabulary') {
            this.setState({screen: 'modebuttons'})
        }
    }

    render() {
        


        return (
            <div className='main'>
                {this.state.screen === 'modebuttons' && <ModeButtons chooseTesting={() => this.chooseMode(modeTest)} chooseLearning={() => this.chooseMode(modeLearn)}/>}
                {this.state.screen === 'select-vocabulary' && 
                <SelectVocabulary
                    loadVerbs = {() => this.loadWordsType(verbsLink, theme_verbs)}
                    loadNouns = {() => this.loadWordsType(nounsLink, theme_nouns)}
                    loadPrepositions = { () => this.loadWordsType(prepositionsLink, theme_prepositions)}
                />}
               <div className="cards-wrapper">
                    {this.state.screen === 'cards' && this.props.current_theme && this.renderThemeWords(this.props.current_theme)}
               </div>
               <BackButton disabled={this.state.mode === 'modebuttons'} clickBack={() => this.handleClickBack()} />
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        current_theme: state.current_theme,
        verbs: state.verbs,
        nouns: state.nouns,
        prepositions: state.prepositions
    }
}

const mapDispatchToProps = {
    loadWords: loadWords,
    learnAword: learnAword
}

const WordManager = connect(mapStateToProps, mapDispatchToProps)(WordManagerComponent);
export {WordManager};
