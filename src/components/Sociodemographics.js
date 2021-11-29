import React, { Component } from 'react';


export default class Soziodemographics extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        // Get the name and value of the clicked radio button and save it to the corresponding question state
        const target = event.target;
        let value = target.value;
        const name = target.name;

        // occupation is a text and input which should not be parsed to an int (bad coding)
        if (name !== "nationality") {
            value = parseInt(value);
        }

        let socioDemAns = {}
        socioDemAns[name] = value;

        this.props.inputChange(socioDemAns);

    }

    render() {

        return(
            <div className="section" style={{marginTop: "1.5rem"}}>
                {this.props.language === "german" ?
                    <div className={"content"}>
                        <h4>Schritt 4: Einführung abschließen und Studie starten</h4>
                        <p>
                            Sie sind am Ende der Einführung in die Studien-App angekommen. Machen Sie abschließend bitte noch
                            einige Angaben zu Ihrer Person und bestätigen Sie dann, dass Sie die Studie starten möchten.
                        </p>
                        <p>
                            Wenn Sie auf "Studie starten" klicken, schließt sich dieses Fenster und die Studien-App
                            bleibt passiv im Hintergrund, bis sie nach etwa 60 Minuten ein Fenster zur ersten Datenerhebung öffnet.
                        </p>
                        <hr/>
                    </div>
                    :
                    <div className={"content"}>
                        <h4>Step 4: Complete the Introduction and Start the Study</h4>
                        <p>
                            You have reached the end of the introduction to this Study-App. Lastly, please fill in your
                            personal information and consent that you wish to start participation.
                        </p>
                        <p>
                            If you click “Start the study”, this window will be closed and the Study-App will sleep until
                            it launches the first data collection window after about 60 minutes.
                        </p>
                        <hr/>
                    </div>
                }

                    <div className={"field"} style={{marginTop: "25px"}}>
                        <p className="questionTextStyle">{this.props.language === "german" ? "Ihr Alter:" : "Your Age-Group:"}</p>
                        <div className="control">
                            <div className={"select is-info"}>
                                <select name={"age"}
                                        value={this.props.answers.age}
                                        onChange={this.handleInputChange}>
                                    <option value={-99} disabled={true} hidden={true}>{this.props.language === "german" ? "Bitte wählen Sie aus" : "Please select:"}</option>
                                    <option value={1}>{this.props.language === "german" ? "jünger als 30" : "younger than 30"}</option>
                                    <option value={2}>{this.props.language === "german" ? "30 bis 39" : "30 to 39"}</option>
                                    <option value={3}>{this.props.language === "german" ? "40 bis 49" : "40 to 49"}</option>
                                    <option value={4}>{this.props.language === "german" ? "50 bis 59" : "50 to 59"}</option>
                                    <option value={5}>{this.props.language === "german" ? "60 oder älter" : "60 or older"}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={"field"} style={{marginTop: "25px"}}>
                    <span>
                        <p className="questionTextStyle">{this.props.language === "german" ? "Ihr Geschlecht:" : "Your Gender:"}</p>
                        <div className={"control"}>
                            <label className={"radio"}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    value="0"
                                    checked={this.props.answers.sex === 0}
                                    name="sex"
                                    onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "weiblich" : "female"}
                            </label>
                            <label className={"radio"} style={{marginLeft: 25}}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    value="1"
                                    checked={this.props.answers.sex === 1}
                                    name="sex"
                                    onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "männlich" : "male"}
                            </label>
                            <label className={"radio"} style={{marginLeft: 25}}>
                                <input style={{marginRight: 5}}
                                       type="radio"
                                       value="2"
                                       checked={this.props.answers.sex === 2}
                                       name="sex"
                                       onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "divers" : "diverse"}
                            </label>
                        </div>
                    </span>
                    </div>

                <div className={"field"} style={{marginTop: "25px"}}>
                        <label className="label">{this.props.language === "german" ? "Ihre Nationalität:" : "Your Nationality:"}</label>
                        <div className="control">
                        <input className="input is-info"
                               style={{width: "350px"}}
                               name="nationality"
                               type="text"
                               value={this.props.answers.nationality === -99 ? "" : this.props.answers.nationality}
                               onChange={this.handleInputChange}
                               spellCheck={false}
                               placeholder={this.props.language === "german" ? "Ihre Nationalität" : "Your Nationality"}/>
                        </div>
                </div>

                <div className={"field"} style={{marginTop: "25px"}}>
                    <span>
                        <p className="questionTextStyle">{this.props.language === "german" ? "Ihr Beruflicher Status:" : "Your Occupational Status:"}</p>
                        <div className={"control"}>
                            <label className={"radio"}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    value="0"
                                    checked={this.props.answers.occupation === 0}
                                    name="occupation"
                                    onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "Berufstätig" : "Working"}
                            </label>
                            <label className={"radio"} style={{marginLeft: 25}}>
                                <input
                                    style={{marginRight: 5}}
                                    type="radio"
                                    value="1"
                                    checked={this.props.answers.occupation === 1}
                                    name="occupation"
                                    onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "im Studium/ in der Schule" : "Student"}
                            </label>
                            <label className={"radio"} style={{marginLeft: 25}}>
                                <input style={{marginRight: 5}}
                                       type="radio"
                                       value="2"
                                       checked={this.props.answers.occupation === 2}
                                       name="occupation"
                                       onChange={this.handleInputChange}
                                />{this.props.language === "german" ? "Sonstiges" : "Other"}
                            </label>
                        </div>
                    </span>
                </div>



                <div style={{marginTop: "3rem", width: "100%", textAlign: "center"}}>
                    <button className={this.props.hasEnded ? "button is-link is-loading" : "button is-link"}
                            disabled={this.props.hasEnded}
                            onClick={() => this.props.endSociodem()}>{this.props.language === "german" ? "Studie starten" : "Start the Study"}</button>
                </div>

            </div>
        );
    }

}