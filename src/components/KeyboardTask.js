import React, { Component } from 'react';

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
            inputValue: null,
            textIsCorrect: true,
            numberOfTries: 0,
            passwordSubmission: false,
            taskWindowSize: Math.floor(this.props.taskWindowSize * 0.66)
        }

        // define a password that is used in the typing task
        this.password = "Test8673!"

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

    handleChange(e) {
        this.setState({inputValue: e.target.value}, ()=> {console.log(this.state.inputValue)})
    }

    checkIfEqual(event) {

        event.preventDefault();
        // get the value and length of the written text in the text field
        let writtenText = this.state.inputValue;

        this.setState({textIsCorrect: true, passwordSubmission: true}, () => {

            setTimeout(() => {
                if (writtenText === this.password) {
                    this.endTask()
                } else {
                    // if the typed in password was wrong, show an error message
                    this.setState({
                        textIsCorrect: false,
                        numberOfTries : this.state.numberOfTries + 1,
                        passwordSubmission: false
                    })
                }

            }, 1000)
        })
    }

    endTask() {

        console.log(this.typingData);

        this.props.endTask({
            typingData: this.typingData,
        });
    }


    // add the info about which circle was clicked last to the data: keep the string as short as possible to save data
    onKeyboardEvent(datapoint) {

        console.log(datapoint);

        const taskInfo = {
            cor: this.state.numberOfTries
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
                            <p>
                                Der Abschluss jeder Datenerhebung ist die Aufgabe, einen vorgegebenes Passwort
                                in ein Textfeld abzuschreiben.
                            </p>
                            <br />
                            <p>
                                Bestätigen Sie die Eingabe durch Drücken der Enter Taste. Falls Sie das Passwort
                                falsch abgeschrieben haben, wird Ihnen dies angezeigt. Die Aufgabe endet sobald
                                Sie das Passwort korrekt abgeschrieben haben.
                            </p>
                            <br />
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
                            Bitte geben Sie das Passwort ein und bestätigen Sie Ihre Eingabe
                            durch das Drücken der Enter-Taste
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
                            }}>{this.password}</label>
                            <form onSubmit={(e) => this.checkIfEqual(e)}>
                                <div className={this.state.passwordSubmission ? "control is-large is-loading" : "control is large"}>
                                    <input className={ this.state.passwordSubmission ? "input is-large is-link" :
                                        this.state.textIsCorrect ? "input is-large is-link" : "input is-large is-danger"}
                                           type="password"
                                           ref={this.inputRef}
                                           onChange={(event) => this.handleChange(event)}
                                           onMouseDown={(event) => this.preventClicking(event)}
                                           spellCheck={false}
                                           disabled={this.state.passwordSubmission}
                                    />
                                </div>
                                <p className="help is-large is-danger"
                                   style={{visibility: this.state.textIsCorrect ? "hidden" : "visible"}}>
                                    Das von Ihnen eingegebene Passwort ist inkorrekt
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                {this.renderInstruction()}
            </div>
        )
    }

}