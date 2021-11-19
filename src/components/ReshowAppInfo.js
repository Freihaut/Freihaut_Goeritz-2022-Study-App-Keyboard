/*
Reshows the Tutorial when the participant clicks on the option in the system Tray
 */

import React, { Component } from 'react';

import SelfReport from "./SelfReport";
import KeyboardTask from "./KeyboardTask";
import AppStartPage from "./AppStartPage";


export default class ReshowAppInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {page: "infoPage"}
    }

    switchPage(page) {
        this.setState({page: page})
    }

    renderTutorialPage(state) {

        if (state === "infoPage") {
            return (<AppStartPage tutorial={false} endCurrentPage={() => this.switchPage("task")}
                                  language={this.props.language}/>)
        } else if (state === "task") {
            return (<KeyboardTask intro={true}
                                  endTask={() => this.switchPage("selfReport")}
                                  taskWindowSize={this.props.taskWindowSize}
                                  language={this.props.language}/>)
        } else if (state === "selfReport") {
            return (<SelfReport intro={true}
                                endReport={() => this.switchPage("infoPage")}
                                language={this.props.language}/>)
        }
    }

    render() {

        return(
            <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
                <div style={{margin: "auto"}}>
                    <nav className="navbar is-fixed-top is-expanded" role="navigation" aria-label="main navigation">
                        <div className={"tabs is-small is-toggle is-fullwidth"}>
                            <ul>
                                <li className={this.state.page === "infoPage" ? "is-active" : ""}>
                                    <a onClick={() => this.switchPage("infoPage")}>
                                        <span>{this.props.language === "german" ? "1. Study-App Infos" : "1. Study-App Info"}</span>
                                    </a>
                                </li>
                                <li className={this.state.page === "task" ? "is-active" : ""}>
                                    <a onClick={() => this.switchPage("task")}>
                                        <span>{this.props.language === "german" ? "2. Vorschau Aufgabe" : "2. Task Preview"}</span>
                                    </a>
                                </li>
                                <li className={this.state.page === "selfReport" ? "is-active" : ""}>
                                    <a onClick={() => this.switchPage("selfReport")}>
                                        <span>{this.props.language === "german" ? "3. Vorschau Fragen" : "3. Question Preview"}</span>
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
        )
    }
}