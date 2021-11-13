// importing require packages and modules
const mongoose = require(`mongoose`);
const {logWarning, logError} = require(`../helpers/console`);

//importing require config params
const {HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR }} = require(`../config`);

//requiring required schemas
const User = require(`../../api/models/user.model`);
const Product = require(`../../api/models/product.model`);
const Order = require(`../../api/models/order.model`);

// role in local database and returns response to its caller
const saveProduct = async (productData) =>{
    try {
        //creating object to store product
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId,
            ...productData
        });
        const result = await newProduct.save();
        return{
            status: CREATED,
            data:result
        }
    } catch (error) {
        // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveProduct -> system.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `Product creation failed due to duplicate ${duplicateErrorFields}.` : `Product creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

      };
    }
};

const findProduct = async (queryScope) => {

    try {
  
      // querying database for all system permissions
      const result = await Product.find({ isDeleted: false }).select(queryScope).lean().exec();
  
      // returning saved system permissions to its caller
      return {
  
        status: SUCCESS,
        data: result
  
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // loggine error messages to the console
      logError(`ERROR @ findProduct -> system.services.js`, error);
  
      // returning response to indicate failure to its caller
      return {
  
        status: SERVER_ERROR,
        error: `Unhandled exception occured on the server.`
  
      };
  
    }
  
}

// this data service takes in system permission id and query scope, fetches
// system permission stored in the database
const findProductById = async (product, queryScope) => {

    try {
  
      // querying database for the requested system permission
      const result = await Product.findOne({ _id: product }).select(queryScope).lean().exec();
  
      // checking the result of the query
      if (!result) {
        // this code runs in case query didn't return anything from database
  
        return {
  
          status: NOT_FOUND,
          error: `Requested data not found in database.`
  
        };
  
  
      }
  
      // returning fetched data to its caller
      return {
  
        status: SUCCESS,
        data: result
  
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // loggine error messages to the console
      logError(`ERROR @ findProductById -> system.services.js`, error);
  
      // returning 'SERVER_ERROR' to indicate failure to its caller
      return {
  
        status: SERVER_ERROR,
        error: `Unhandled exception occured on the server.`
  
      };
  
    }
  
}

// this data service takes in product id, update data object and query
// scope, updates product stored in the database according to the
// provided params and returns the updated product.
const findProductByIdAndUpdate = async (productId, updateData,  queryScope) => {

    try {
  
      // fetching required data from incoming updateBy
      //const { _bearer, allowedSystemPermissions } = updateBy;
  
      // creating an obj to store query config params
      const configParams = {
  
        new: true,
        runValidators: true
  
      };
  
      // looping through update data obj to parse it as required
      for (const attr in updateData) {
  
        // checking current attr and parsing data accordingly
        if (attr === `isDeleted`) {
          // this code runs in case current field is 'isDeleted'
  
          // adding change log in the database
          updateData[`$push`] = {
  
            updateLogs: {
  
              update: {
  
                field: attr,
                value: updateData[attr]
  
              },
              _updater: _bearer,
              updatedAt: Date.now()
  
            }
  
          };
  
          // stopping the current loop
          break;
  
        } else {
          // this code runs in case current attr doesn't match any of
          // above
  
          // adding change log in the database
          updateData[`$push`] = {
  
            updateLogs: {
  
              update: {
  
                field: attr,
                value: updateData[attr]
  
              },
              _updater: _bearer,
              updatedAt: Date.now()
  
            }
  
          };
  
        }
  
      }
  
      // querying database for the requested system permission
      const result = await Product.findOneAndUpdate({ _id: productId, isDeleted: false }, updateData, configParams).select(queryScope).lean().exec();
  
      // checking the result of the query
      if (!result) {
        // this code runs in case query didn't return anything from database
  
        return {
  
          status: NOT_FOUND,
          error: `Requested data not found in database.`
  
        };
  
      }
  
      // returning fetched data to its caller
      return {
  
        status: SUCCESS,
        data: result
  
      };
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // loggine error messages to the console
      logError(`ERROR @ findProductByIdAndUpdate -> system.services.js`, error);
  
      // checking if the error stems from duplicate value in database
      const isDuplicateError = error && error.code === 11000;
  
      // fetching fields which caused duplication error
      const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);
  
      // setting value of status and description
      const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `Product update failed due to duplicate ${duplicateErrorFields}.` : `Product update failed.`];
  
      // returning response to indicate failure to its caller
      return {
  
        status,
        error: err
  
      };
  
    }
  
  }

  // role in local database and returns response to its caller
const saveUser = async (userData) =>{
    try {
        //creating object to store product
        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            ...userData
        });
        const result = await newUser.save();
        return{
            status: CREATED,
            data:result
        }
    } catch (error) {
        // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveUser -> system.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `User creation failed due to duplicate ${duplicateErrorFields}.` : `User creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

      };
    }
};

  module.exports = {
      saveProduct,
      findProduct,
      findProductById,
      findProductByIdAndUpdate,
      saveUser
  };