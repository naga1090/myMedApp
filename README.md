# Welcome to eMed!

Hi! This is a Electronic Health Records app, meant to make it easier for people to travel between various doctors and lab and not worry about paper copies.

## Initilization

To start off, run:
>npm install --global expo-cli

This will install expo command line tools needed to start the project

>expo init NAME-OF-PROJECT -t "blank"

This will create a new app called "NAME-OF-PROJECT" with a "blank" templet (other templets are avilable use expo init --help)

## Running the App

To run the app paste this command from the root directory of the expo folder:
>expo start

This will start the app and launch a developer tools webpage on your localhost. From there you can run different emulations including iOS, Android, and/or Web. (Assume you have expo and already ran "expo init" and cd into newly created directory)

## Commands Ran

These were the commands used to get libaraires and pacakges to make the app work
> npm install @react-navigation/native

> npm install @react-navigation/native-stack

> npm install -g @aws-amplify/cli (here down used AWS Amplify tutorial found below)

> amplify configure (make sure to have AWS account, this command will configure it on your project)

> amplify init

> yarn add aws-amplify aws-amplify-react-native (if error occurs after, run "npm install" to download dependencies)

> amplify env pull (not in tutorial)

> amplify status (not in tutorial)

> amplify add auth

> amplify push

## React Nagivation

React Nagivation documentation: **https://reactnavigation.org/docs/getting-started**
- Remember to add route to function paramater to get access to passing paramaters in screen.js files
- Import all the exported functions in various screen.js files into App.js which is central navigation hub, to create navigation stack

## AWS Amplify

AWS Amplify tutorial: **https://dzone.com/articles/a-complete-guide-for-integrating-aws-amplify-to-re**

- Stored aws acccess and secret access key on local computer under info excel file
- Remember to include Amplify.config(CONFIG FILE); to App.js
- Config file might be under src folder and not in root dir depending on how amplify was configed inifitally
- AWS Auth needs username named variable, even if using email as username
- Create custom attributes on AWS management console cognito user group settings, once created cannot be undone. Need to - Create custom ones to store other useful data before signing in user first time
- if app does not work after running "yarn add aws-amplify aws-amplify-react-native" from ^, run "npm install" to install dependencies, should work after

## Git Issues

If branch is behind main by X commits:
1) git checkout main
2) git pull origin main
3) git checkout NAME-OF-BRANCH-BEHIND-COMMITS
4) git merge main // Now your branch is in sync with local main branch
5) git push origin NAME-OF-BRANCH-BEHIND-COMMITS
