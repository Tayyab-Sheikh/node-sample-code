// importing require packages and modules
const cors = require(`cors`);
const morgan = require(`morgan`)
const express = require(`express`);
const {logSuccess, logInfo, logError} = require(`./dependencies/helpers/console`);
const {connection, disconnect} = require(`./dependencies/helpers/database`);

// importing required config params
const { server_MODE, NODE_PORT, MAX_FILE_SIZE_ALLOWED_BYTES, HTTP_STATUS_CODES: { SUCCESS } } = require(`./dependencies/config`);

// importing required routers
const { systemRouter } = require(`./api/routers/system.routers`);
// REMIANING ROUTERS GO HERE

// creating instance of express server
const server = express();

//initializing server
(async () =>{
    try {
        server.listen(8080, logInfo(`initializing server`));

        global.CONNECTED_CLIENTS = {};

        server.use(cors());
        server.use(morgan(`dev`));
        server.use(express.urlencoded({extended: false})); 

        // api handlers
        server.use(`/api/product`, systemRouter); // validation done
        // LIST OF API HANDLERS GO HERE

        // creating test route
         server.get(`/`, (req, res, next) => res.status(SUCCESS).send(`|| Service is UP & RUNNING in ${server_MODE} mode ||`));


        await connection();

        // logging message to the console
        logInfo(`Server is running @ port 3000.`);
        console.log(`helllooooooooo`);
    } catch (error) {
         // this code runs in case of an ERROR @ runtime

    // logging error message to the console
    logError(`ERROR @ Server Initialization Process.`, error);
    }
});


// disconnecting from the database instance before killing
// the process
process.on(`SIGINT`, async () => {

    // disconnecting server from database
    await disconnect();
  
  });