/*
This function component renders the start page of the app introduction when participants first open the app
 */

import React from 'react';
// import the german intro image
import IntroImageGer from "./base64Images/TutorialImage_Ger";
//import the english intro image
import IntroImageEng from './base64Images/TutorialImage_Eng'
// import the App Symbol Image
import AppSymbolImage from "./base64Images/AppSymbolImage";
// import the close Symbol Image
import CloseSymbolImage from "./base64Images/CloseSymbol";


export default function AppStartPage (props) {

   return(
       <div className="section" style={{marginTop: "1.5rem"}}>
           <div className={"content"}>
               {// if the study app-language is german
                   props.language === "german" ?
                       <div>
                           {props.tutorial ?
                               <div>
                                   <h3 className={"title is-4"}>
                                       Willkommen zur Einführung über den Ablauf der Studie
                                   </h3>
                                   <p>
                                       Diese Einführung beinhaltet vier Schritte. Sobald Sie alle vier Schritte der Einführung
                                       abgeschlossen haben, beginnt die Studie. Bitte lesen Sie sich alle Informationen aufmerksam durch.
                                   </p>
                                   <br/>
                               </div>:
                               null}
                           <h4>
                               Schritt 1: Allgemeine Informationen zur Study-App
                           </h4>
                           <p>
                               Während Sie an der Studie teilnehmen und solange die Study-App ausgeführt wird, öffnet die Study-App in
                               regelmäßigen Zeitabständen von 60 Minuten ein Fenster zur Datenerhebung. Die Datenerhebung umfasst zwei Teile und dauert
                               etwa 30 Sekunden. Im ersten Teil geht es darum, eine Aufgabe zu bearbeiten. Im zweiten Teil werden Sie gebeten, Fragen zu beantworten.
                               Beide Teile werden Ihnen in Schritt 2 und Schritt 3 dieser Einführung genauer erläutert.
                           </p>
                           <p>
                               Die Datenerhebung über die Study-App erfolgt automatisch, ohne, dass Sie aktiv eingreifen müssen. Dafür wird die
                               Study-App automatisch ausgeführt. Bei Start dieses Computers wird die Study-App ebenfalls automatisch gestartet.
                               Solange die Study-App ausgeführt ist,
                               sehen Sie das <strong>Study-App Symbol</strong>
                               &nbsp;<img style={{width: "20px", height: "20px"}} src={AppSymbolImage}/> in Ihrer <strong><i>{process.platform === "darwin" ? "Menüleiste" : "Systemleiste"}</i></strong> (siehe Bild).
                           </p>
                           <p>
                               Falls Sie die automatische Ausführung der Studie unterbrechen möchten, können die Study-App manuell beenden, in dem Sie auf dieses
                               Study-App Symbol klicken und dann "Study-App beenden" auswählen.
                               Um die Study-App nach dem Beenden manuell wieder zu starten, klicken Sie auf das <strong>Study-App Symbol</strong>
                               &nbsp;<img style={{width: "20px", height: "20px"}} src={AppSymbolImage}/> auf Ihrem <strong><i>Desktop</i></strong>.
                               Über das Study-App Symbol in der <strong><i>{process.platform === "darwin" ? "Menüleiste" : "Systemleiste"}</i></strong> können Sie außerdem jederzeit
                               diese Informationen zur Study-App erneut aufrufen.
                           </p>

                           <figure className="image">
                               <img src={IntroImageGer} style={{"border": "1px solid black", "borderTopStyle": "none",
                                   "borderBottomStyle": "none"}}/>
                               <figcaption>
                                   Das Study-App Symbol in Ihrer {process.platform === "darwin" ? "Menüleiste" : "Systemleiste"} zeigt, dass die Study-App gestartet ist. Durch Klicken auf das Study-App
                                   Symbol können Sie Optionen aufrufen, um die Study-App zu beenden oder die Informationen zur Study-App
                                   erneut anzuzeigen.
                               </figcaption>
                           </figure>

                           <p>
                               Wenn die Study-App ein Fenster zur Datenerhebung öffnet und Sie dieses mal nicht an der Datenerhebung teilnehmen möchten oder können,
                               schließen Sie das Fenster mit dem <strong>Schließen Symbol</strong> <img style={{height: "13px"}} src={CloseSymbolImage}/> Das
                               Auslassen einer Datenerhebung beendet nicht Ihre Studienteilnahme.
                           </p>
                           <p>
                               Die Studie endet automatisch 10 Tage nachdem Sie die Studie in Schritt 4 gestartet haben.
                               Die Study-App zeigt Ihnen an, dass die Datenerhebung beendet ist
                               und es öffnet sich danach kein Fenster zur Datenerhebung mehr.
                           </p>
                           <p>
                               Nach dem Ende der Studie oder falls Sie Ihre Studienteilnahme vorzeitig beenden möchten, können Sie die
                               Study-App deinstallieren.
                           </p>
                           <p>
                               Psychologiestudierende der Universität Freiburg können für ihre Studienteilnahme 2
                               Versuchspersonenstunden erhalten. Nach Beendigung der Studie erhalten Sie dafür einen
                               Code, mit dem Sie Ihre Studienteilnahme validieren können.
                           </p>
                           <p>
                               Bei weiteren Fragen zur Study-App wenden Sie sich an:
                           </p>
                           <p>
                               Paul Freihaut, M.Sc. <br/>
                               Universität Freiburg <br/>
                               Wirtschaftspsychologie <br/>
                               E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                           </p>

                           <br/>
                           <div className="control" style={{width: "100%", textAlign: "center"}}>
                               <button className={"button is-link"} onClick={() => props.endCurrentPage()}>Weiter</button>
                           </div>
                       </div>
                       // if the study-app language is english
                       :
                       <div>
                           {props.tutorial ?
                               <div>
                                   <h3 className={"title is-4"}>
                                       Welcome to the study introduction
                                   </h3>
                                   <p>
                                       There are four steps in this introduction. Once you complete all four steps, the study will start.
                                       Please take your time to read all information thoroughly.
                                   </p>
                                   <br/>
                               </div>:
                               null}
                           <h4>
                               Step 1: General Information about the Study-App
                           </h4>
                           <p>
                               While you are participating in this study and as long as the Study-App is running, the Study-App will open
                               a data collection window at regular intervals of 60 minutes. The data collection
                               consists of two parts and completing it takes about 30 seconds. In the first part, you have to
                               work on a task. In the second part, you have to answer a questionnaire. Both parts will
                               be explained in Step 2 and 3 in this introduction in more detail.
                           </p>
                           <p>
                               The data collection via this Study-App is automated and does not require your initiative action.
                               When you start your computer, the app will be launched automatically. As long as the Study-App is
                               running, you will see the <strong>Study-App icon</strong>
                               &nbsp;<img style={{width: "20px", height: "20px"}} src={AppSymbolImage}/> in your notification area in the taskbar (see image).
                           </p>
                           <p>
                               If you wish to pause the automatic appearance of the study, you can close the Study-App
                               manually by clicking the Study-App icon and selecting “Quit the Study-App”.
                              To restart the Study-App manually, you have to click the <strong>Study-App icon</strong>
                               &nbsp;<img style={{width: "20px", height: "20px"}} src={AppSymbolImage}/> on the work area of you desktop.
                               You can also display this information again at any time via the Study-App icon in the taskbar.
                           </p>

                           <figure className="image">
                               <img src={IntroImageEng} style={{"border": "1px solid black", "borderTopStyle": "none",
                                   "borderBottomStyle": "none"}}/>
                               <figcaption>
                                   The Study-App icon in the taskbar indicates that the Study-App is running. By clicking
                                   on the Study-App icon, you can access the options to quit the Study-App or to re-display this information about the Study-App.
                               </figcaption>
                           </figure>

                           <p>
                               If the Study-App opens a data collection window and you do not wish
                               or are not able to take part, you can close the window by clicking the <strong>close button</strong>
                               &nbsp;<img style={{height: "13px"}} src={CloseSymbolImage}/>. Omitting a data collection does not end your participation in this study.
                           </p>
                           <p>
                               This study will be terminated automatically 10 days after you started the study in Step 4.
                               The Study-App will display that the data collection has ended and that no further data collection window will be launched.
                           </p>
                           <p>
                               At the end of the study, or if you wish to withdraw from this study earlier, you can uninstall the Study-App.
                           </p>
                           <p>
                               If you are a psychology student at the Freiburg University you can receive
                               2 hours of participation credits in exchange for you study participation.
                               At the end of the study, you will be given a code to validate your study participation.
                           </p>
                           <p>
                               For further inquiries regarding this Study-App, you can contact:
                           </p>
                           <p>
                               Paul Freihaut, M.Sc. <br/>
                               Freiburg University <br/>
                               Department of Occupation and Consumer Psychology <br/>
                               E-Mail: <a href={"mailto:paul.freihaut@psychologie.uni-freiburg.de"}>paul.freihaut@psychologie.uni-freiburg.de</a>
                           </p>

                           <br/>
                           <div className="control" style={{width: "100%", textAlign: "center"}}>
                               <button className={"button is-link"} onClick={() => props.endCurrentPage()}>Continue</button>
                           </div>
                       </div>
               }
           </div>
       </div>
   )

}