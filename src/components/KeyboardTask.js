import React, { Component } from 'react';

// import the mouse Tracker
import KeyboardTracker from "./KeyboardTracker";


export default class MouseTask extends Component {

    constructor(props) {

        super(props);

        this.inputRef = React.createRef();

        this.state = {
            modal: this.props.intro ? "modal is-active" : "modal",
            inputClass: "input is-medium is-link",
            textIsCorrect: true,
            numberOfTries: 0,
            passwordSubmission: false,
            taskWindowSize: Math.floor(this.props.taskWindowSize * 0.66)
        }

        // define a password that is used in the typing task
        this.password = "BallOrange3829!"

        // settings for the modal if its the task intro and the modal is triggered
        if (this.props.intro) {
            document.body.classList.add("is-clipped");
        }

        // initialize an Array to store the task mouse datapoints
        this.typingData = [];

        this.endTask = this.endTask.bind(this);

    }

    componentDidMount() {
        // focus the input field if the task has no intro (if the ref would be focused while the modal is active,
        // it might cause problems
        if (!this.props.intro) {
            this.inputRef.current.focus();
        }
    }

    // check if the task window size changes (when persons drag the task window to a smaller screen or change the screen
    // size)
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.taskWindowSize !== this.props.taskWindowSize) {
            this.setState({ taskWindowSize: Math.floor(this.props.taskWindowSize * 0.66) });
        }
    }

    // close the modal when the close modal button is pushed and focus the input ref
    closeModal() {
        document.body.classList.remove("is-clipped");
        this.setState({
            modal: "modal"
        }, () => {this.inputRef.current.focus()});
    }

    checkIfEqual(event) {

        event.preventDefault();
        // get the value and length of the written text in the text field
        let writtenText = this.inputRef.current.value;

        // set a loading state to the input field for a few seconds to signal that the input is processed
        this.setState({textIsCorrect: true, passwordSubmission: true, inputClass: "input is-medium is-link"}, () => {

            setTimeout(() => {
                // if the password is correct, end the task
                if (writtenText === this.password) {
                    this.endTask()
                } else {
                    // if the typed in password was wrong, show an error message, clear the input field and focus it
                    this.setState({
                        textIsCorrect: false,
                        numberOfTries : this.state.numberOfTries + 1,
                        passwordSubmission: false,
                        inputClass: "input is-medium is-danger"
                    }, () => {
                        // empty and focus the input field
                        this.inputRef.current.focus();
                        this.inputRef.current.value = "";
                    })
                }

            }, 1000)
        })
    }

    // prevent clicking inside the input field
    preventClicking(e) {
        e.preventDefault();
    }

    // prevent that the focus is changed away from the input field
    preventFocusChange() {
        setTimeout(() => {
            this.inputRef.current.focus()
        }, 20)
    }

    // prevent the use of the Numpad numbers
    preventNumpad(e) {
        if (e.which >= 96 && e.which <= 105) {
            e.preventDefault();
        }
    }

    // end the task and send the typing data into the parent component
    endTask() {
        this.props.endTask({
            typingData: this.typingData,
        });
    }


    // add the info about which circle was clicked last to the data: keep the string as short as possible to save data
    onKeyboardEvent(datapoint) {

        const taskInfo = {
            cor: this.state.numberOfTries
        }

        Object.assign(datapoint, taskInfo);

        this.typingData.push(datapoint);
    }


    // instruction modal to explain the task in the tutorial
    renderInstruction() {

        return (

            <div className={this.state.modal} style={{ textAlign: "left" }}>
                <div className="modal-background">{null}</div>
                <div className="modal-content">
                    <header className="modal-card-head">
                        <p className="modal-card-title"><b>
                            {this.props.language === "german" ?
                                "Schritt 2: Vorschau der Aufgabe"
                                :
                                "Step 2: Preview of the Task"
                            }
                        </b></p>
                    </header>
                    <section className="modal-card-body">
                        {this.props.language === "german" ?
                            <div className={"content"}>
                                <p>
                                    Jede Datenerhebung beginnt mit der Aufgabe, ein vorgegebenes Passwort
                                    in ein Textfeld abzuschreiben.
                                </p>
                                <p>
                                    Das Passwort besteht aus Buchstaben, Zahlen und einem Sonderzeichen. Verwenden Sie zum
                                    Schreiben der Zahlen nur die Zahlentasten über den Buchstaben auf Ihrer Tastatur. Die
                                    Eingabe der Zahlen mit dem "Numpad" ist für diese Aufgabe deaktiviert.
                                </p>
                                <p>
                                    Bestätigen Sie die Eingabe des Passworts durch Drücken der "Enter" Taste. Falls Sie das Passwort
                                    falsch abgeschrieben haben, wird Ihnen dies angezeigt. Die Aufgabe endet sobald
                                    Sie das Passwort korrekt abgeschrieben haben und Ihre Eingabe mit Enter bestätigt haben.
                                </p>
                            </div>
                            :
                            <div className={"content"}>
                                <p>
                                   Each data collection starts with the task to type in a given password
                                    into an input field.
                                </p>
                                <p>
                                    The password contains letters, numbers and one special character. You can only type
                                    in numbers using the number keys above the letter keys. The number keys on the
                                    "Numpad" are disabled for this task.
                                </p>
                                <p>
                                    Please press the "Enter" key to confirm your entry. If you have typed the password
                                    incorrectly, you will be notified. The task ends as soon as you have typed the password correctly
                                    and pressed enter to confirm your entry.
                                </p>
                            </div>
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <button className={"button is-link"} onClick={() => this.closeModal()}>
                            {this.props.language === "german" ? "Aufgabe starten" : "Start Task"}
                        </button>
                    </footer>
                </div>
            </div>
        )
    }


    render() {

        return (
            <div>
                <KeyboardTracker onEvent={(e) => this.onKeyboardEvent(e)} />
                <div className="card" style={{ width: this.state.taskWindowSize, marginTop: "1rem"}}>
                    <header className="card-header">
                        <p className="card-header-title">
                            {this.props.language === "german" ?
                                "Bitte geben Sie das Passwort ein und bestätigen Sie die Eingabe mit der Enter-Taste"
                                :
                                "Please type the displayed password into the input field and press enter to confirm your entry"
                            }
                        </p>
                    </header>
                    <div className="card-content" style={{margin: "2.5rem"}}>
                        <div className="field">
                            <label className="label is-medium">
                                {this.props.language === "german" ?
                                    "Ihr Passwort"
                                    :
                                    "Your Password"
                                }
                            </label>
                            <div className="control is-medium">
                                <input className="input is-medium" type="text" value={this.password} disabled={true}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-medium" style={{
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                UserSelect: "none"}}>
                                {this.props.language === "german" ?
                                    "Passwort Eingabe"
                                    :
                                    "Password Entry"
                                }
                            </label>
                            <form onSubmit={(e) => this.checkIfEqual(e)}>
                                <div className={this.state.passwordSubmission ? "control is-medium is-loading" : "control is-medium"}>
                                    <input className={this.state.inputClass}
                                           type="password"
                                           ref={this.inputRef}
                                           onMouseDown={(event) => this.preventClicking(event)}
                                           onBlur={(event) => this.preventFocusChange(event)}
                                           onKeyDown={(event) => this.preventNumpad(event)}
                                           placeholder={this.props.language === "german" ? "Geben Sie Ihr Passwort ein" : "Please enter your password"}
                                           spellCheck={false}
                                           disabled={this.state.passwordSubmission}
                                    />
                                </div>
                                <p className="help is-medium is-danger"
                                   style={{visibility: this.state.textIsCorrect ? "hidden" : "visible"}}>
                                    {this.props.language === "german" ?
                                        "Das eingegebene Passwort ist falsch"
                                        :
                                        "The entered password is incorrect"
                                    }
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