# pomedapi server

Starting to work on a Node server to run the app of daycare Pomedapi.
System is working, with basic users and blogposts CRUD.

## In maintenance

Only the js-backend is fully working, need some work on universal-node-router to bypass the .d.ts files
Otherwise can work with full ts files if app is launched with script

```bash
node -r ts-node/register ./app.js
```

## to do
 - [ ] Make a "under construction" banner for a first served file
 - [ ] Establish relationships between entries in Mongo DB
 - [ ] Make auth possible