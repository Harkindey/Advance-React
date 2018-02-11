import './index.css';
import React, { Component } from 'react';

/* 
    The Component is very cool, 
    But we want to be able to compose state like we compose our component

    we remove the state, then include some amount of jsx to the `onChange`
    We can also tell it to just render instead of reaction to `onChange` props

    we name a prop `render` we gave it a function
    We could not only compose the element of scroll we could compose it state too.
    //Function as children pattern or Render prop LOL
*/

const getHeaderStyle = (y) => {
    const pin = y >= 300;
    const top = -y / 2;
    return {
        top: pin ? '0px' : `${top + 150}px`,
        textShadow: pin
            ? `0px ${(y - 300) / 5}px ${Math.min((y - 300) / 10, 50)}px rgba(0, 0,0,0.5)`
            : 'none'
    }
}

class ScrollY extends Component {
    state = { y: 0 }

    handleWindowScroll = () => {

        this.setState({ y: window.scrollY })
    }

    componentDidMount() {
        this.handleWindowScroll()
        window.addEventListener('scroll', this.handleWindowScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll)
    }
    render() {
        // return this.props.render(this.state.y);
        return this.props.children(this.state.y);
    }
}

class App extends Component {

    render() {
        const { y } = this.state;
        return (
            <div className="app">
                {/* <ScrollY render={(y) => (
                    <h1 style={getHeaderStyle(y)}>
                        Scroll Down!
                </h1>
                )} /> */}
                <ScrollY>
                    {(y) => (
                        <h1 style={getHeaderStyle(y)}>
                            Scroll Down!
                    </h1>)}
                </ScrollY>
            </div>
        )
    }
};

export default App;
