const {logWarning, logError} = require(`../../dependencies/helpers/console`);

const{saveProduct, findProduct, findProductById, findProductByIdAndUpdate, saveUser} = require(`../../dependencies/internal-services/system.services`);

const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../../dependencies/config`);



// this controller takes data via incoming request body and creates a new system
// role in the database.
const addProduct = async (req, res, next) => {

    try {

      // calling data service to save new system role in the database
      const { status, data, error } = await saveProduct(req.body);
  
      // checking the result of the operation
      if (status === SERVER_ERROR) {
        // this code runs in case data service failed due to
        // unknown database error
  
        // logging error message to the console
        logError(`Requested operation failed. Unknown database error.`);
  
        // returning the response with an error message
        return res.status(SERVER_ERROR).json({
  
          hasError: true,
          message: `ERROR: Requested operation failed.`,
          error: {
  
            error
  
          }
  
        });
    } else if (status === CONFLICT) {
        // this code runs in case data service failed due to
        // duplication value
  
        // logging error message to the console
        logError(`Requested operation failed. Product with duplicate field(s) exists.`);
  
        // returning the response with an error message
        return res.status(CONFLICT).json({
  
          hasError: true,
          message: `ERROR: Requested operation failed.`,
          error: {
  
            error
  
          }
  
        });
  
      }
  
      // returning the response with success message
      return res.status(CREATED).json({
  
        hasError: false,
        message: `SUCCESS: Requested operation successful.`,
        data: {
  
          systemRole: data
  
        }
  
      });
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // logging error messages to the console
      logError(`ERROR @ addSystemRole -> system.controllers.js`, error);
  
      // returning response with an error message
      return res.status(SERVER_ERROR).json({
  
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
  
          error: `An unhandled exception occured on the server.`
  
        }
  
      });
  
    }
  
}


const getAllProducts = async (req, res, next) => {

    try {
  
      // calling data service to fetch all system roles from database
      const { status, data, error } = await findProduct(`-__v`);
  
      // checking the result of the operation
      if (status === SERVER_ERROR) {
        // this code runs in case data service failed due to
        // unknown database error
  
        // logging error message to the console
        logError(`Requested operation failed. Unknown database error.`);
  
        // returning the response with an error message
        return res.status(SERVER_ERROR).json({
  
          hasError: true,
          message: `ERROR: Requested operation failed.`,
          error: {
  
            error
  
          }
  
        });
  
      }
  
      // returning the response with success message
      return res.status(SUCCESS).json({
  
        hasError: false,
        message: `SUCCESS: Requested operation successful.`,
        data: {
  
          totalProducts: data.length,
          Products: data
  
        }
  
      });
  
    } catch (error) {
      // this code runs in case of an error @ runtime
  
      // logging error messages to the console
      logError(`ERROR @ getAllProducts -> system.controllers.js`, error);
  
      // returning the response with an error message
      return res.status(SERVER_ERROR).json({
  
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
  
          error: `An unexpected error occurred on the server.`
  
        }
  
      });
  
    }
  
}

// this controller takes in system role id via path params of url, searches
// database for the requested system role and returns it
const fetchSpecificProduct = async (req, res, next) => {

  try {

    // fetching required data via path params of url
    const { productId } = req.params;

    // calling data service to fetching requested system role from database
    const { status, data, error } = await findProductById(productId, `-__v`);

    // checking the result of the operation
    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    } else if (status === NOT_FOUND) {
      // this code runs in case data service could not find
      // the requested resource

      // logging error message to the console
      logError(`Requested operation failed. Product not found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    }

    // returning the response with success message
    return res.status(SUCCESS).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        systemRole: data

      }

    });

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ fetchSpecificProduct -> system.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `An unexpected error occurred on the server.`

      }

    });

  }

}

// this controller takes in system role id via path params of url, searches
// database for the requested system role and updates it
const updateProduct = async (req, res, next) => {

  try {

    // fetching required data via incoming path params of url
    const { productId } = req.params;

    // calling data service to update requested system role in the database
    const { status, data, error } = await findProductByIdAndUpdate(productId, req.body, req.tokenData, `-__v`);

    // checking the result of the operation
    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to
      // unknown database error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    } else if (status === NOT_FOUND) {
      // this code runs in case data service could not find
      // the requested resource

      // logging error message to the console
      logError(`Requested operation failed. Product not found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `ERROR: Requested operation failed. Product not found.`,
        error: {

          error

        }

      });

    }

    // returning the response with success message
    return res.status(SUCCESS).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        systemRole: data

      }

    });

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ updateProduct -> system.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `An unexpected error occurred on the server.`

      }

    });

  }

}

module.exports = {
  addProduct,
  getAllProducts,
  findProductById,
  findProductByIdAndUpdate
};