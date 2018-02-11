import React, { Component } from 'react';
import 'index.css';
import FaAutomobile from 'react-icons/lib/fa/automobile';
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from './text';

/*
    -   Lets reuse our code to take in tabs from bottom.
        tabsOnbottom={true} --> (passing a prop)
        render can take and array so we can say if tabsOnbottom
        do panel before tabs [panel,tabs] if not [tabs,panel]
    -   Let work on disabling a tab, 
        pass the index of tab to be disabled
        disabled={[1]} --> (passing another prop)
    DO WE HAVE THAT COMPONENT WHICH KEEPS CHANGING 
    WHERE WE KEEP ON PASSING NEW PROPS EVERY TIME
    MAYBE THERE IS A WAY WE CAN COMPOSE THE UI TOGETHER
    TO STOP ADDING MORE FEATURES WITH PROPS
    -   We create a bunch of component to compound this interaction
        together
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
       * How do we get the app state in 
       * <Tabs /> to <TabList /> to <Tab /> as props
       * We call it IMPLICIT STATE
       * There are some IMPLICIT STATE with the tabs that the 
       * product developer doesnt want to see
    -   So what we do is we clone the children of this interaction
        and attach the activeIndex props to It as props, *SMILE*
            const children = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {
                    activeIndex: this.state.activeIndex
                }).
            }) 
        So instead of Rendering this.props.children we render this new children we just created
            const { activeIndex } = this.props;
            const children = React.Children.map(this.props.children, (child, index) => {
                    return React.cloneElement(child, {
                        isActive: index === activeIndex
                    })
                })
        So now state change is passed down as props also from parent to the last individual child
    -   You might be upset cause you like the old Tabs API better
        RYAN FLORENCE got you covered *grin*

        SO WHEN YOU EMPLOY THE CONCEPT OF COMPUND COMPONNET YOU CAN USE YOUR OLD 
        COMPONENT TO WRAP UP NEW ONES
*/


class Tabs extends Component {
    state = {
        activeIndex: 0
    }

    selectTabIndex = (activeIndex) => {
        this.setState({ activeIndex });
    }
    render() {
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                activeIndex: this.state.activeIndex,
                onSelectTab: () => this.selectTabIndex
            })
        })
        return (
            <div className="Tabs">
                {children}
            </div>
        )
    }
}

class TabList extends Component {
    render() {
        const { activeIndex } = this.props;
        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                isActive: index === activeIndex,
                onSelect: () => this.props.onSelectTab(index)
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
    render() {
        const { activeIndex, children } = this.props;
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

class DataTabs extends Component {
    render() {
        const { data } = this.props;
        return (
            <Tabs>
                <TabList>
                    {data.map(tab => (
                        <Tab>{tab.label}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {data.map((tabpanel) => (
                        <TabPanel>{tabpanel.content}</TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        )
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
                <DataTabs data={tabData} />
            </div>
        )
    }
};

export default App;
/*
class Tabs extends Component {
    state = {
        activeIndex: 0
    }

    selectTabIndex(activeIndex) {
        this.setState({ activeIndex });
    }

    renderTabs() {
        // const { data, disabled } = this.props;
        // return data.map((tab, index) => {
        //     const isActive = this.state.activeIndex === index;
        //     const isDisabled = disabled.includes(index);
        //     return (
        //         <div
        //             key={index}
        //             className={
        //                 isDisabled
        //                     ? 'tab disabled'
        //                     : isActive
        //                         ? 'tab active'
        //                         : 'tab'
        //             }
        //             onClick={isDisabled ? null : () => this.selectTabIndex(index)}
        //         >{tab.label}</div>
        //     )
        // })
    }

    renderPanel() {
        // const { data } = this.props;
        // const { activeIndex } = this.state;
        // return <div>{data[activeIndex].content}</div>
    }

    render() {
        const { tabsOnBottom } = this.props;
        // const tabs = (
        //     <div className="tabs">
        //         {this.renderTabs()}
        //     </div>
        // )

        // const panel = (
        //     <div className="panels">
        //         {this.renderPanel()}
        //     </div>
        // )

        // return (
        //     <div className="Tabs">
        //         {tabsOnBottom ? [tabs, panel] : [panel, tabs]}
        //     </div>
        // )
    }
};

*/