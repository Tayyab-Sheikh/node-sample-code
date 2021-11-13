// importing required packages and modules
const {isValidObjectId} = require(`mongoose`);
const isValid = require(`validator/lib/isBase64`);

//importing require config params
const {ALLOWED_INCOMING_FILE_TYPES} = require(`../config`);

// custom validator for incoming objectId value
const objectIdValidation = (value, helpers) => {
    // validating incoming value
    if (!isValidObjectId(value)) {
      // this code runs in case incoming value is not a valid
      // object id
  
      // returning with an error indicating that incoming value
      // is invalid
      return helpers.error(`any.invalid`);
    }
  
    // returning incoming value if it is valid
    return value;
  };


// custom validator for incoming base64 value
const base64Validation = (value, helpers) => {

    // fetching metadata and data from incoming value
    const [metaData, data] = value.split(`,`);
  
    // 1-> initializing an variable to check if metadata is valid
    // 2-> initializing an variable to check if incoming file type
    // is valid
    const [hasValidMetaData, hasValidFileType] = [metaData.startsWith(`data:`), ALLOWED_INCOMING_FILE_TYPES.some(type => metaData.includes(type))];
  
    // validating incoming value's metadata
    if (!hasValidMetaData) {
      // this code runs in case incoming base64 string metadata
      // was not available
  
      // storing custom error
      const error = new Error(`it doesn't have valid base64 metadata.`);
  
      // returning with an error indicating that incoming value
      // is invalid
      return helpers.error(`any.custom`, { error });
  
    } else if (!hasValidFileType) {
      // this code runs in case incoming file type is not valid
  
      // storing custom error
      const error = new Error(`it is not 'jpg', 'jpeg' or 'png' file.`);
  
      // returning with an error indicating that incoming value
      // is invalid
      return helpers.error(`any.custom`, { error });
  
    }
  
    // validating incoming value
    if (!isValid(data)) {
      // this code runs in case incoming value is not a valid
      // value
  
      // storing custom error
      const error = new Error(`it is not a valid base64 encoded string.`);
  
      // returning with an error indicating that incoming value
      // is invalid
      return helpers.error(`any.custom`, { error });
  
    }
  
    // returning incoming value if it is valid
    return value;
  
  };
  
  
  
  // exporting validation helpers as modules
  module.exports = { 
    objectIdValidation,
    base64Validation
  };