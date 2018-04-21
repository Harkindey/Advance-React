import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './index.css';
import { Galaxy, Trees, Earth } from './screens';
import createMediaListener from './createMediaListener';

/*
    We wanna share state and some life cycle stuff
    this state the app developer actually cares about it.
    We need to figure out how to remove `state and some life cycle stuff`
    and reveal it to the app developer

    Lets do it with `cloneElement` in WithMedia:
        render() {
            return React.cloneElement(this.props.children, this.state)
        }
    const AppWithMedia = () => <WithMedia><App /></WithMedia>
    this works but it fills like magic, LOL.

    Lets do this with an HOC (Higher Order Component);

    Higher Order Functions (HOF) is a function that returns a fucntion
     function add (x,y){
          x + y (NORMAL)
     }
     function CreateAdder(x) {
        return function(y){
            return x + y
        }
     }  Same as `const CreateAdder = (x) => (y) => x + y` tho

     How do we use it
     const addBy3 = createAdder(3)
     then addBy3(2); VIOLA

     HOC get there name form HOF
     do not think that Because HOF is a funtion that returns a function then
     HOC is a comoponent that returns a Component . That is not the Case.


*/
//const withMedia = (Comp, queries) => {
const withMedia = (queries) => (Comp) => {
    const media = createMediaListener(queries);

    return class WithMedia extends Component {
        state = {
            media: media.getState()
        }
        componentDidMount() {
            media.listen(media => this.setState({ media }))
        }
        componentWillUnmount() {
            media.dispose();
        }

        render() {
            return <Comp {...this.state} />
        }
    }
}


class App extends Component {
    // state = {
    //     media: media.getState()
    // }
    // componentDidMount() {
    //     media.listen(media => this.setState({ media }))
    // }
    // componentWillUnmount() {
    //     media.dispose();
    // }

    render() {
        const { media } = this.props;
        return (
            <CSSTransitionGroup
                transitionName="fade"
                transistionEnterTimeout={300}
                transistionLeaveTimeout={300}
            >
                {
                    media.big
                        ? (<Galaxy key="galaxy" />)
                        : media.tiny
                            ? (<Trees key="trees" />)
                            : (<Earth key="earth" />)
                }
            </CSSTransitionGroup>
        )
    }
};

//const AppWithMedia = () => <WithMedia><App /></WithMedia>
const AppWithMedia = withMedia({
    big: '(min-width: 1000px)',
    tiny: '(max-width: 600px)'
})(App);// decorators
// const AppWithMedia = withMedia(App, {
//     big: '(min-width: 1000px)',
//     tiny: '(max-width: 600px)'
// });
/*
const DashBoardWithMedia = withMedia(Dashboard)
const SomethingWithMedia= WithMedia(Something)
You can do this for all component you want to pass same state around.
*/
export default AppWithMedia;
