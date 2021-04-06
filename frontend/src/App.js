import React from 'react';
import './App.css';
import {CardsManager} from './components/CardsManager/CardsManager.jsx';
import {ModeButtons} from './components/ModeButtons/ModeButtons.jsx';
import {TypeWords} from './components/TypeWords/TypeWords.jsx'

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 'modebuttons'
    }
  }
  render() {
    return (
      <div className='main'>
        {this.state.screen === 'modebuttons' && <ModeButtons/>}
        {this.state.screen === 'cards' && <CardsManager/>}
        {this.state.screen === 'type-words' && <TypeWords />}
      </div>
      
    )
  }
}

export default App;
