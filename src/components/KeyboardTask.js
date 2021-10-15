import React, { Component } from 'react';
const { ipcRenderer } = require("electron");

// import the mouse Tracker
import KeyboardTracker from "./KeyboardTracker";

// import the mouse task image
import MouseTaskImage from "./base64Images/MouseTaskImage";

export default class MouseTask extends Component {

    constructor(props) {

        super(props);

        this.inputRef = React.createRef();

        this.state = {
            modal: this.props.intro ? "modal is-active" : "modal",
            textIsCorrect: true,
            taskWindowSize: Math.floor(this.props.taskWindowSize * 0.66)
        }

        // hold all possible 25 task order coordinates in a variable (they were randomly generated with the constraint
        // that they had to fit without overlap and then hard coded here)
        const trialText = [
            "6a5CiM", "7cJhWs", "3Kzn1H", "Tz3j98", "3pkabE", "yEN3fD", "hf6GaS", "j27N7i"
        ]

        // getting a random number var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        // return a random number between 0 and 24
        this.randomNumber = Math.floor(Math.random() * trialText.length);

        // select a randomly chosen click order from all 25 possible click orders
        this.typingText = trialText[this.randomNumber];

        // settings for the modal if its the task intro and the modal is triggered
        if (this.props.intro) {
            document.body.classList.add("is-clipped");
        }

        // initialize an Array to store the task mouse datapoints
        this.typingData = [];

        this.endTask = this.endTask.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taskWindowSize !== this.props.taskWindowSize) {
            this.setState({ taskWindowSize: Math.floor(this.props.taskWindowSize * 0.66) });
        }
    }

    checkIfEqual(event) {
        // get the value and length of the written text in the text field
        let writtenText = event.target.value.trim();
        let textLen = writtenText.length;

        if (writtenText === this.typingText) {
            this.endTask()
        } else if (this.typingText.slice(0, textLen) !== writtenText) {
            // if the the text is the same as the sliced text to retype, show no error
            this.setState({
                textIsCorrect: false,
            })
        } else {
            // if the user makes a typing mistake, show error --> set state to incorrect
            this.setState({
                textIsCorrect: true,
            })
        }
    }

    endTask() {
        this.props.endTask({
            typingData: this.typingData,
        });
    }


    // add the info about which circle was clicked last to the data: keep the string as short as possible to save data
    onKeyboardEvent(datapoint) {
        const taskInfo = {
            cor: this.state.textIsCorrect
        }

        Object.assign(datapoint, taskInfo);

        this.typingData.push(datapoint);
    }

    // prevent clicking inside the input field
    preventClicking(e) {
        e.preventDefault();
        this.inputRef.current.focus();
    }


    // instruction modal to explain the task in the tutorial
    renderInstruction() {

        return (

            <div className={this.state.modal} style={{ textAlign: "left" }}>
                <div className="modal-background">{null}</div>
                <div className="modal-content">
                    <header className="modal-card-head">
                        <p className="modal-card-title"><b>Schritt 2: Vorschau der Aufgabe</b></p>
                    </header>
                    <section className="modal-card-body">
                        <div>
                            <div className="media">
                                <div className="media-left" style={{ display: "flex", alignSelf: "center" }}>
                                    <figure className="image" style={{ width: "10rem" }}>
                                        <img src={MouseTaskImage}
                                            alt={"Placeholder image"}
                                        />
                                    </figure>
                                </div>
                                <div className={"media-content"}>
                                    <p>
                                        Jede Datenerhebung beginnt mit der Aufgabe, einen festgelegten Text abzuschreiben
                                        (siehe oberes Bild).
                                    </p>
                                    <br />
                                    <p>
                                        Der Text muss fehlerfrei abgeschrieben werden. Sobald Sie einen Fehler beim
                                        Abschreiben machen wird Ihnen das angezeigt (siehe unteres Bild).
                                        Korrigieren Sie den Fehler, bevor Sie mit dem Abschreiben fortfahren.
                                    </p>
                                    <br />
                                    <p>
                                        Die Aufgabe endet, sobald der gesamte Text korrekt abgeschrieben wurde.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className={"button is-link"} onClick={() => this.closeModal()}>Aufgabe starten</button>
                    </footer>
                </div>
            </div>
        )
    }

    // close the modal when the close modal button is pushed
    closeModal() {
        document.body.classList.remove("is-clipped");
        this.setState({
            modal: "modal"
        });
    }


    render() {

        return (
            <div>
                <KeyboardTracker onEvent={(e) => this.onKeyboardEvent(e)} />
                <div className="card" style={{ width: this.state.taskWindowSize}}>
                    <header className="card-header">
                        <p className="card-header-title">
                            Bitte schreiben Sie den Text in das Textfeld ab
                        </p>
                    </header>
                    <div className="card-content" style={{margin: "3rem"}}>
                        <div className="field">
                            <label className="label is-large" style={{
                                  WebkitUserSelect: "none",
                                  MozUserSelect: "none",
                                  msUserSelect: "none",
                                  UserSelect: "none",
                                  marginBottom: "2rem"
                            }}>{this.typingText}</label>
                            <div className="control">
                                <input className={ this.state.textIsCorrect ? "input is-large is-link" : "input is-large is-danger"}
                                 type="text"
                                 ref={this.inputRef}
                                 onMouseDown={(event) => this.preventClicking(event)}
                                 onKeyUp={(ev) => this.checkIfEqual(ev)}
                                 spellCheck={false}
                                 />
                            </div>
                            <p className="help is-large is-danger"
                            style={{visibility: this.state.textIsCorrect ? "hidden" : "visible"}}>
                                Bitte korrigieren Sie den Fehler
                            </p>
                        </div>
                    </div>
                </div>
                {this.renderInstruction()}
            </div>
        )
    }

}