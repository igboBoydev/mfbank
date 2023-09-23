## How To Start And Run The Backend API Service
 -  Start Your Mysql Datase
 -  Open the project directory on your terminal and add all env values 
 -  Run npx sequelize-cli db:create to create the database
 -  Run npm run migrate to migrate all tables to the database
 -  Run npm run seed to seed all entries in the database
 -  Run npm run jest to test all the endpoints in the application
 -  Run npm start to start the appication

 ## Note: The application includes a cron job that run on redis so you'll require a redis server to run it, if the redis server is not running kindly ignore adding anything to the redis key-value pair on the .env file else write REDIS=true