// importing required data for database
const {DB_USERNAME, DB_PASSWORD} = require(`./credential`);

//setting app modes
const ALLOWED_APP_MODES = [`DEV`,`STAGE`,`PROD`];

//FETCHING APP mode
const APP_MODE = process.env.APP_MODE && ALLOWED_APP_MODES.includes(process.env.APP_MODE) ? process.env.APP_MODE : `PROD`;

// exporting config params
module.exports = {
    APP_MODE,

    NODE_PORT:3000,

    API_BASE_URL:  APP_MODE === `DEV` ? `http://localhost:3000` : APP_MODE === `STAGE` ? `http://localhost:3000` : `http://localhost:3000`,

    MONGO_ATLAS_CONNECTION_URI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tgtfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

    HTTP_STATUS_CODES:{
    
    SUCCESS: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500
    
    },

    ALLOWED_VALIDATION_SCHEMA_SCOPES: {

        BODY: `BODY`,
    
        PARAMS: `PARAMS`,
    
        NONE: `NONE`
    
      },
    
      DEFAULT_RECORDS_PER_PAGE: 10,
    
      ALLOWED_MIN_PASSWORD_LENGTH: 8,
    
      MAX_FILE_SIZE_ALLOWED_BYTES: 1024 * 1024 * 5,
    
      ALLOWED_INCOMING_FILE_TYPES: [`jpg`, `jpeg`, `png`],
    
      JWT_EXPIRY_IN_SECONDS: 2592000, // 30 Days

};

