import './Card.css';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {testDoneAC, testFailedAC} from '../../store/action'


class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            test: ''
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({text: value});
    }
    checkingValues = (ru,id,event) => {
        event.preventDefault();
        let form = event.target;
        if(ru === this.state.text) {
            this.setState({text: '', test: 'done'})
            form.value = '';
            setTimeout(() => this.setState({test: ''}), 1000);
            setTimeout(() => this.props.testDoneAC(id), 1500);
            
        }else {
            form.value = '';
            this.setState({text: '', test: 'failed'})
            form.value = ''
            setTimeout(() => this.setState({test: ''}), 1000);
            setTimeout(() => this.props.testFailedAC(id), 1500);
        }
    }


    render() {
    const {en, ru, learnAword, mode} = this.props;
    const enClassName = cn('word-en', { 'completed': mode === 'test', 'done': this.state.test === 'done', 'failed': this.state.test === 'failed'});

    return <div className='card' onClick={learnAword}>
            <div className={enClassName}>{en}</div>
            {mode === 'learn' && <div className='word-en-translate'>{ru}</div>}
            {mode === 'test' && <form onBlur={(event) => this.checkingValues(ru, en, event)}> <input type='text' className='input-translate' onChange={this.handleChange}/></form>}
    </div>
    }
}

const mapDispatchToProps = {
    testFailedAC: testFailedAC,
    testDoneAC: testDoneAC

}

const Card = connect(null, mapDispatchToProps)(CardComponent);
export {Card};