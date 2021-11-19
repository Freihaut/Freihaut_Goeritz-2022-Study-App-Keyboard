/*
This function component renders the end page that shows that the study has ended
 */

import React from 'react';
import {ipcRenderer, shell} from "electron";


export default function StudyEnd (props) {

    return(

        <div style={{display: "flex", alignItems: "center", height: "100vh"}}>
            <div style={{margin: "auto"}}>
                <div className="section">
                    <div className={"content"}>
                        <div className={"notification is-light is-info"}>
                            {
                                props.language === "german" ?
                                    // german version
                                    <div>
                                        <h3 className={"title"}>
                                            Die Studie ist beendet
                                        </h3>
                                        <p>
                                            Die Study-App erfüllt nun keinen Zweck mehr und Sie können die Study-App deinstallieren. Es ist empfohlen,
                                            die Study-App zu deinstallieren. Die Deinstallation der Study-App ist jedoch nicht notwendig.
                                            &nbsp;<a onClick={()=> {shell.openExternal(process.platform === "darwin" ?
                                            "https://google.com" : "https://google.com")}}>In den Unterlagen zur Study-App</a>&nbsp;
                                            finden Sie eine kurze Anleitung zur Deinstallation. Falls Sie
                                            Hilfe bei der Deinstallation benötigen, wenden Sie sich gerne jederzeit an den unten stehenden Kontakt.
                                        </p>
                                        <p>
                                            Falls Sie Psychologie an der Universität Freiburg studieren, können Sie für Ihre Studienteilnahme
                                            2 Versuchspersonenstunden erhalten. Notieren Sie sich dafür Ihren persönlichen
                                            Versuchspersonencode und folgen Sie den <a onClick={()=> {shell.openExternal(process.platform === "darwin" ?
                                            "https://google.com" : "https://google.com")}}>Hinweisen zum Erhalten der Versuchspersonenstunden</a>.
                                        </p>
                                        <p style={{fontStyle: "italic", fontWeight: "bold"}}>Ihr VPN Code: {props.participantId}</p>
                                        <br/>
                                        <h4 className={"title"}>
                                            Vielen herzlichen Dank für Ihre Teilnahme an dieser Studie und Ihren Beitrag zur Wissenschaft!
                                        </h4>
                                        <p>
                                            Falls Sie noch Rückfragen zu der Studie oder der Study-App haben, können Sie mich
                                            gerne kontaktieren.
                                        </p>
                                        <p>
                                            Paul Freihaut, M.Sc. <br/>
                                            Universität Freiburg <br/>
                                            Wirtschaftspsychologie <br/>
                                            E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                                        </p>
                                        <br/>
                                        <div className="control" style={{width: "100%", textAlign: "center"}}>
                                            <button className={"button is-link"}
                                                    onClick={() => ipcRenderer.send("close")}>
                                                Study-App beenden
                                            </button>
                                        </div>
                                    </div>
                                :
                                    // english version
                                    <div>
                                        <h3 className={"title"}>
                                            Die study has ended
                                        </h3>
                                        <p>
                                            The Study-App no longer serves any purpose and you can uninstall the Study-App.
                                            It is recommended to uninstall the Study-App, but it is not compulsory.
                                            In the
                                            &nbsp;<a onClick={()=> {shell.openExternal(process.platform === "darwin" ?
                                            "https://google.com" : "https://google.com")}}>Study-App documentations</a>&nbsp;
                                            you will find instructions about the uninstallation process. If you need any help
                                            with the uninstallation, please feel free to contact us without hesitation.
                                        </p>
                                        <p>
                                            If you are a psychology student at the Freiburg University you can receive
                                            2 hours of participation credits in exchange for you study participation.
                                            Please make note of your personal participation code and follow the
                                            <a onClick={()=> {shell.openExternal(process.platform === "darwin" ?
                                            "https://google.com" : "https://google.com")}}>instructions of crediting</a>.
                                        </p>
                                        <p style={{fontStyle: "italic", fontWeight: "bold"}}>Your participation code: {props.participantId}</p>
                                        <br/>
                                        <h4 className={"title"}>
                                            Thank you very much for the participation in this study and your contribution to science!
                                        </h4>
                                        <p>
                                            If you have any inquiries about the study or Study-App, please feel free to contact:
                                        </p>
                                        <p>
                                            Paul Freihaut, M.Sc. <br/>
                                            Freiburg University <br/>
                                            Deparment of Occupational and Consumer Psychology <br/>
                                            E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                                        </p>
                                        <br/>
                                        <div className="control" style={{width: "100%", textAlign: "center"}}>
                                            <button className={"button is-link"}
                                                    onClick={() => ipcRenderer.send("close")}>
                                                Quit the Study-App
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}