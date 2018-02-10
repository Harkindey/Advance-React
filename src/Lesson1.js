import React, { Component } from 'react';
import createOscillator from './createOscillator';
import SineWave from './SineWave';
import logo from './logo.svg';
import './App.css';

/*  Firstly system works with out state,
    by letting app respond to user event 
        onMouseEnter={this.play} ----> this.oscillator.play();
        onMouseLeave={this.stop} ----> this.oscillator.stop();
    but i have to remove the time constraint (event)
    a lot of state are playing around on managed 
        isPlaying: false,
        pitch: 0.5,
        volume: 0.25
    When we say we eliminate time it means user 
    dont have to MouseEnter or MouseLeave to play the instrument
    instead we can just change some state
    WAIT A SECOND WHAT OF IF WE HAVE A COMPONENT THAT CAN PLAY A TONE!!!
    We are gonna make this ----> <Tone /> 
    Now that we have a component we can render two sounds,'COMPOSITION'
    You can see how we make thing declarative we 
    get to compose them together
    With react we can declaratively compose our UI
    and offload our dom updates to re-render and the only way to 
    offload the updates is by calling re-render
    ELIMINATE TIME AND GET COMPOSITION
*/

class Tone extends Component {
  oscillator = createOscillator();

  componentWillMount() {
    this.doImperativeStuff();
  }

  componentDidUpdate() {
    this.doImperativeStuff();
  }

  doImperativeStuff() {
    const { isPlaying, pitch, volume } = this.props;
    if (isPlaying) {
      this.oscillator.play();
    } else {
      this.oscillator.stop();
    }
    this.oscillator.setPitchBend(pitch);
    this.oscillator.setVolume(volume);
  }
  render() {
    return null
  }
}
class App extends Component {

  state = {
    isPlaying: false,
    pitch: 0.5,
    volume: 0.25
  }

  play = () => {
    this.setState({ isPlaying: true })
    //this.oscillator.play();
  }

  stop = () => {
    this.setState({ isPlaying: false })
    //this.oscillator.stop();
  }

  changeTone = (event) => {
    const { clientX, clientY } = event;
    const { top, right, bottom, left } = event.target.getBoundClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    this.setState({ pitch, volume });
    //this.oscillator.setPitchBend(pitch);
    //this.oscillator.setVolume(volume);
  }

  render() {
    return (
      <div id="l01">
        <div className="theremin"
          onMouseEnter={this.play}
          onMouseLeave={this.stop}
          onMouseMove={this.changeTone}
        />
        <SineWave
          width="400px"
          height="400px"
          amplitude={this.state.volume}
          frequency={this.state.pitch}
          draw={this.state.isPlaying}
        />
        <Tone
          isPlaying={this.state.isPlaying}
          pitch={this.state.pitch}
          volume={this.state.volume}
        />
        <div className="label pitch">Pitch</div>
        <div className="label volume">Volume</div>
      </div>
    );
  }
}

export default App;
