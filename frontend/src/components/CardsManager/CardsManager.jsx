import React from 'react';
import './CardsManager.css';
import {ModeButtons} from '../ModeButtons/ModeButtons.jsx';
import {Card} from '../Card/Card.jsx';

export class CardsManager extends React.Component {
    
    
    render() {
       return <div className='cards-wrapper'>
            <Card en='task' ru='task' isTraning={true}/>
            <Card en='task' ru='task' isTraning={true} />
            <Card en='task' ru='task' isTraning={true}/>
            <Card en='task' ru='task' isPractice= {true} />
            <Card en='task' ru='task' isTraning={true} />
        </div>
       
        
    }
}