import React, { Component } from 'react';

// simple language selection component
export default  class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            languageValue: "german"
        }
    }

    handleChange(event) {
        this.setState({languageValue: event.target.value})
    }

    render() {

        return (
            <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <div style={{margin: "auto"}}>
                    <section style={{textAlign: "center"}} className="section">

                        <div className={"box"} style={{backgroundColor: "hsl(206, 70%, 96%)"}}>

                            <div className={"content"}>
                                <p className="title is-4">
                                    Herzlichen Dank für die Installation der Studien-App!
                                </p>
                                <p className={"subtitle is-4"}>Thank you for installing the Study-App!</p>
                                <br/>
                                <p className={"title is-5"}>
                                    Bitte wählen Sie die Sprache, in der Sie die Studie durchführen möchten.
                                </p>
                                <p className={"subtitle is-5"}>
                                    Before you start, please select the study language.
                                </p>

                                <div style={{marginTop: "2em"}} className="field is-grouped is-grouped-centered">
                                    <div className="control">
                                        <div className="select is-medium">
                                            <select onChange={(e) => {this.handleChange(e)}}>
                                                <option value={"german"}>Deutsch</option>
                                                <option value={"english"}>English</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p className="control">
                                        <button className="button is-medium is-info" onClick={() => this.props.languageSelected(this.state.languageValue)}>
                                            Start
                                        </button>
                                    </p>
                                </div>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
        );

    }

}