/*
This file handles the tutorial, which is shown when the app is first started after installation
and optionally when the participant wants to see it again by clicking on the info option on tray icon
 */

import React, { Component } from 'react';

import SelfReport from "./SelfReport";
import KeyboardTask from "./KeyboardTask";
import AppStartPage from "./AppStartPage";
import Sociodemographics from "./Sociodemographics";


export default class Tutorial extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: "welcome",
            hasEnded: false,
            socioDemographics: {
                age: -99,
                sex: -99,
                nationality: -99,
            }
        }
    }

    switchPage(page) {

        this.setState({page: page})
    }

    // if a user makes an entry in the socidem questions update the state with the new entry
    // the sociodem data is passed into and handled in the tutorial component to save the answers if the user moves
    // away from the sociodem page
    handleSocioDemInput(socioDemData){

        this.setState({
            socioDemographics: {...this.state.socioDemographics, ...socioDemData}
        })
    }

    endTutorial() {

        this.setState({
            hasEnded: true
        }, () => {
            this.props.endTutorial({"Sociodemographics": this.state.socioDemographics})
        })

    }

    renderTutorialPage(state) {

        if (state === "welcome") {
            return (<AppStartPage tutorial={true} endCurrentPage={() => this.switchPage("selfReport")}
                                  language={this.props.language}/>)
        } else if (state === "selfReport") {
            return (<SelfReport intro={true}
                                endReport={() => this.switchPage("task")}
                                language={this.props.language}/>)
        } else if (state === "task") {
            return (<KeyboardTask intro={true}
                                  endTask={() => this.switchPage("sociodem")}
                                  taskWindowSize={this.props.taskWindowSize}
                                  language={this.props.language}/>)
        } else if (state === "sociodem") {
            return (<Sociodemographics answers={this.state.socioDemographics}
                                       hasEnded={this.state.hasEnded}
                                       inputChange={(data) => this.handleSocioDemInput(data)}
                                       endSociodem={() => this.endTutorial()}
                                       language={this.props.language}/>)
        }
    }

    render() {

        return(
            <div>
                <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
                    <div style={{margin: "auto"}}>
                        <nav className="navbar is-fixed-top is-expanded" role="navigation" aria-label="main navigation">
                                <div className={"tabs is-small is-toggle is-fullwidth"}>
                                    <ul>
                                        <li className={this.state.page === "welcome" ? "is-active" : ""}>
                                            <a onClick={() => this.state.hasEnded ? null : this.switchPage("welcome")}>
                                                <span>{this.props.language === "german" ? "1. Study-App Infos" : "1. Study-App Info"}</span>
                                            </a>
                                        </li>
                                        <li className={this.state.page === "selfReport" ? "is-active" : ""}>
                                            <a onClick={() => this.state.hasEnded ? null : this.switchPage("selfReport")}>
                                                <span>{this.props.language === "german" ? "2. Vorschau Fragen" : "2. Questionnaire Preview"}</span>
                                            </a>
                                        </li>
                                        <li className={this.state.page === "task" ? "is-active" : ""}>
                                            <a onClick={() => this.state.hasEnded ? null : this.switchPage("task")}>
                                                <span>{this.props.language === "german" ? "3. Vorschau Aufgabe" : "3. Task Preview"}</span>
                                            </a>
                                        </li>
                                        <li className={this.state.page === "sociodem" ? "is-active" : ""}>
                                            <a onClick={() => this.state.hasEnded ? null : this.switchPage("sociodem")}>
                                                <span>{this.props.language === "german" ? "4. Studienstart" : "4. Study Start"}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                        </nav>

                        <div>
                            {this.renderTutorialPage(this.state.page)}
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}