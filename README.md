### DM Screen
Just something I have been working on in my free time. This is heavily a w.i.p and it is designed to make gming easier for dms who play D&D, but it needs a lot of work to get there. 

### Installations
You will need node.js, npm, you will also need to setup a mysql database (you can use my sql workbench for this) and you will need to create the following ".env" file and update the parameters. The password is for your database. The .env file should be placed in the root of the project.

##### .env file
HOST=
USER=
PASSWORD=
DATABASE=
PORT=


##### Npm Installations
npm install --save mysql2
npm install sequelize
npm install dotenv


### To-Do
These are in no specific order

- Add calander tracker.
- Add item tracker
- Update Read.me for a public repository, rather than how I had it as a private one
- Update the comments
- Clean up post routes now that sequelize has been implemented so that its as clean as sequilizeModels and sequelizeQueries.js
- Add tests now sequilize has been added
- Add documentation
- Add code to limit what database tables can be queried for security, this was never needed when it was private code.
- Learn and implement react.
- Improve upon given error messages in the code
