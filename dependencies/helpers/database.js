const mongoose = require(`mongoose`);
const {logSuccess, logInfo, logError} = require(`./console`);


//importing require config dependencies
const {MONGO_ATLAS_CONNECTION_URI} = require(`../config`);


// this helper connects to the instance of MongoDB Atlas database in the cloud
const connection = async () =>{
    try {
        const connectConfig = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };

    //making connection to database
    await mongoose.connect(MONGO_ATLAS_CONNECTION_URI,connectConfig);

    //log success message
    logSuccess(`Database connection successful`);
    } catch (error) {
        //log error message
        logError(`ERROR @ connection -> database.js`, error);
        
        process.exit(1);
    }
}

// this function help to disconnect from database
const disconnect = async () => {

    try {
  
      // closing the active mongoose connection to mongo db
      await mongoose.connection.close();
  
      // logging message to the console
      logInfo(`Connection to database closed.`);
  
      // killing the current process
      process.exit();
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // logging error messages to the console
      logError(`ERROR @ disconnect -> database.js`, error);
  
    }
  
  }