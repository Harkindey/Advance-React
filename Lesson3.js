import React, { Component } from 'react';
import 'index.css';
import FaAutomobile from 'react-icons/lib/fa/automobile';
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from './text';
import * as Proptypes from 'prop-types';

/*
    So this ia our former tab component from lesson 2
    imagine we want add a <div></div> to our components 
    and use flexbox or something it might break
    Because w=the div is a direct child, so we would be cloning a 
    div an passing irrelevant stuffs to it
    const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
        --->    activeIndex: this.state.activeIndex,
        --->    onSelectTab: () => this.selectTabIndex
            })
        })
    SO how can we get the implicit state to
    <Tabs /> ---> <TabList /> ---> <Tab /> as props
    without having to clone the elements
    WE GONNA GET THE IMPLICIT STATE FROM CONTEXT NO LONGER PROPS
    we have to ask for context by creating a static property of the class
        static contextTypes = {
            activeIndex: Proptypes.number.isRequired,
            onSelectTab: Proptypes.func.isRequired
        }
    so because we have decided to receive from context we have to defined it
    has a proptype

    `this.context` is global to react and it by it self can figure out 
    properties pass down to it, instead of passing it by direct props
    so the <Tab /> component shouldnt clone children anymore and pass 
    props to it by recreation.
 
    

*/


class Tabs extends Component {
    static childContextTypes = {
        activeIndex: Proptypes.number.isRequired,
        onSelectTab: Proptypes.func.isRequired
    }
    state = {
        activeIndex: 0
    }
    getChildContext() {
        return {
            activeIndex: this.state.activeIndex,
            onSelectTab: this.selectTabIndex
        }
    }

    selectTabIndex = (activeIndex) => {
        this.setState({ activeIndex });
    }
    render() {
        // const children = React.Children.map(this.props.children, (child) => {
        //     return React.cloneElement(child, {
        //         activeIndex: this.state.activeIndex,
        //         onSelectTab: () => this.selectTabIndex
        //     })
        // })
        return (
            <div className="Tabs">
                {this.props.children}
            </div>
        )
    }
}

class TabList extends Component {
    static contextTypes = {
        activeIndex: Proptypes.number.isRequired,
        onSelectTab: Proptypes.func.isRequired
    }
    render() {
        const { activeIndex, onSelectTab } = this.context;
        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                isActive: index === activeIndex,
                onSelect: () => onSelectTab(index)
            })
        })
        return (
            <div className="tabs">
                {children}
            </div>
        )
    }
}

class Tab extends Component {
    render() {
        const { isActive, isDisabled, onSelect } = this.props;
        return (
            <div
                className={
                    isDisabled
                        ? 'tab disabled'
                        : isActive
                            ? 'tab active'
                            : 'tab'
                }
                onClick={isDisabled ? null : () => onSelect}
            >{this.props.children}</div>
        )
    }
}

class TabPanels extends Component {
    static contextTypes = {
        activeIndex: Proptypes.number.isRequired
    }
    render() {
        const { children } = this.props;
        const { activeIndex } = this.context;
        return (
            <div className="panels">
                {children[activeIndex]}
            </div>
        )
    }
}

class TabPanel extends Component {
    render() {
        return this.props.children
    }
}

class App extends Component {
    render() {
        const tabData = [
            {
                label: <FaAutomobile />,
                content: text.cars
            },
            {
                label: <FaBed />,
                content: text.hotels
            },
            {
                label: <FaPlane />,
                content: text.flights
            },
            {
                label: <FaSpaceShuttle />,
                content: text.space
            }
        ]
        return (
            <div id="app" className="blue-bg">
                {/* <Tabs
                    tabsOnBottom={true}
                    data={tabData}
                    disabled={[1]}
                /> */}
                <Tabs>
                    <TabList>
                        <Tab><FaAutomobile /></Tab>
                        <Tab><FaBed /></Tab>
                        <Tab><FaPlane /></Tab>
                        <Tab><FaSpaceShuttle /></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>{text.cars}</TabPanel>
                        <TabPanel>{text.hotels}</TabPanel>
                        <TabPanel>{text.flights}</TabPanel>
                        <TabPanel>{text.space}</TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        )
    }
};

export default App;

