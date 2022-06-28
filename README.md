## Study-App

This repository contains the study-app that was used for a longitudinal study about the relationship between stress and 
keyboard typing behavior.

### Study-App Description

After installation, the Study-App openes a data collection window to log participants keyboard typing behavior as well 
as their emotional state ratings in frequent intervals of about 60 minutes. Keyboard-Typing behavior is logged during
a password-typing task. Emotional states are logged using two self-report questions asking about valence and arousal.

The Study-App is configured to handle the study process automatically. After installation, it automatically starts
a tutorial. After finishing the tutorial, the Study-App sleeps for an hour before starting a data collection. The
Study-App automatically starts after the computer is restarted. The study duration is 10 days. After this limit,
the Study-App notifies participants about the end of the study and does not collect any data anymore.

### Technical Information

The study-app is an [electron.js](https://www.electronjs.org/) desktop app and uses [React.js](https://reactjs.org/) for 
building the user interface. We used [Electron Forge](https://www.electronforge.io/) as the boilerplate to build the app
as well as [Electron Builder](https://www.electron.build/) to package the app as an .exe for windows or .dmg for Mac.

The backend for saving our data is [Firebase](https://firebase.google.com/). If the participant is not online, the study-app
saves all data locally and pushes the data into the database once the participant is online again.

### Contact

For questions regarding the Study-App, contact: paul.freihaut@psychologie.uni-freiburg.de

