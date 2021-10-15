# Welcome to eMed!

Hi! This is a Electronic Health Records app, meant to make it easier for people to travel between various doctors and lab and not worry about paper copies.

## Initilization

To run the app paste this command from the root directory of the expo folder:
>expo start

This will start the app and launch a developer tools webpage on your localhost. From there you can run different emulations including iOS, Android, and/or Web. (Assume you have expo and already ran "expo init" and cd into newly created directory)

## Commands Ran

These were the commands used to get libaraires and pacakges to make the app work
> npm install @react-navigation/native

> npm install @react-navigation/native-stack

## Git Issues

If branch is behind main by X commits:
1) git checkout main
2) git pull origin main
3) git checkout ~NAME OF BRANCH BEHIND COMMITS~
4) git merge main // Now your branch is in sync with local main branch
5) git push origin ~NAME OF BRANCH BEHIND COMMITS~