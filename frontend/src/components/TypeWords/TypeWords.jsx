import './TypeWords.css';
import React from 'react';
import {loadWords} from '../../store/middleware';
import {clearWords} from '../../store/action'
import { connect } from 'react-redux';
import {Card} from '../Card/Card.jsx'

const verbsLink = 'verbs';
const nounsLink = 'nouns';
const prepositionsLink = 'prepositions';

export class TypeWordsComponent extends React.Component {

    handleLoadVerbs = () => {
        {this.props.words.length && this.props.clearWords()}
        this.props.loadWords(verbsLink);
    }

    handleLoadNouns = () => {
        {this.props.words.length && this.props.clearWords()}
        this.props.loadWords(nounsLink);
    }

    handleLoadPrepositions = () => {
        {this.props.words.length && this.props.clearWords()}
        this.props.loadWords(prepositionsLink);
    }
    
    render() {
        return <div>
                    <div className='buttons-category'>
                        <button className='button-category verbs' onClick={this.handleLoadVerbs}>Verbs</button>
                        <button className='button-category' onClick={this.handleLoadNouns}>Nouns</button>
                        <button className='button-category prepositions' onClick={this.handleLoadPrepositions}>Prepositions</button>
                    </div>
                    <div className='cards-wrapper'>
                        {this.props.words.map(word =>
                            <Card
                                en={word.en}
                                ru={word.ru}
                            />)}
                    </div>
                 </div>
        
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

const TypeWords = connect(mapStateToProps, mapDispatchToProps)(TypeWordsComponent);
export {TypeWords};