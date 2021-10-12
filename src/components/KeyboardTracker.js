// here is the code for the mouse logger inside the app

import React, {Component} from 'react';


// Keyboard typing tracker component for react

export default class MouseTracker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventListener: null
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

     // get keyboard down info and set object value to "undefined" if the browser return undefined
     onKeyDown (e) {

        // if (e.code === undefined || e.key === undefined || e.ctrlKey === undefined || e.shiftKey === undefined) {
        //     console.log("undefinded keydown")
        // }

        this.props.onEvent({
            eventType: "KeyDown",
            time: Date.now(),
            code: e.code === undefined ? "undefined" : e.code,
            key: e.key === undefined ? "undefined" : e.key,
            keyCode: e.keyCode === undefined ? "undefined" : e.keyCode,
            ctrlPressed: e.ctrlKey === undefined ? "undefined" : e.ctrlKey,
            shiftPressed: e.shiftKey === undefined ? "undefined" : e.shiftKey
        });
    }

    // get keyboard up info and set object value to "undefined" if the browser return undefined
    onKeyUp (e) {

        // if (e.code === undefined || e.key === undefined || e.ctrlKey === undefined || e.shiftKey === undefined) {
        //     console.log("undefinded keyup")
        // }

        this.props.onEvent({
            eventType: "KeyUp",
            time: Date.now(),
            code: e.code === undefined ? "undefined" : e.code,
            key: e.key === undefined ? "undefined" : e.key,
            keyCode: e.keyCode === undefined ? "undefined" : e.keyCode,
            ctrlPressed: e.ctrlKey === undefined ? "undefined" : e.ctrlKey,
            shiftPressed: e.shiftKey === undefined ? "undefined" : e.shiftKey
        });
    }


    componentDidMount() {

        // initialize event listeners
        let listener = [];

        // Init our event listeners
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
       
        this.setState({eventListener: listener});

        // console.log("Tracker mounted");
    }


    componentWillUnmount() {

        // remove event listeners
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);

        // console.log("Tracker unmounted");
    }


    render() {
        return (<div/>)
    }
}

