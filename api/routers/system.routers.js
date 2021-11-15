// importing require modules
const express = require(`express`);

//importing middlewares
const {authenticateRequest} = require(`../middlewares/authentication.middleware`);
const {validateInput} = require(`../middlewares/input-validation.middleware`);
const {authorizeRequest} = require(`../middlewares/authorization.middleware`);

//importing require dataValid 
const {specificSUserSchema, specificProductSchema} = require(`../../dependencies/input-validation/user.schema`);

//importing require controllerss
const {addProduct, getAllProducts, findProductById, findProductByIdAndUpdate , addUser} = require(`../controllers/system.controllers`);

const systemRouter = express.Router();

// 1-> route to add a new product in the database
systemRouter.post(`/product`, authenticateRequest, authorizeRequest, validateInput(`BODY`), addProduct);

// 1-> route to fetch a specific product from database via _id
// 2-> route to fetch all products as an array from database
systemRouter.get(`/product:productId`, authenticateRequest, authorizeRequest, validateInput(specificProductSchema, `PARAMS`),findProductById);
systemRouter.get(`/products`, authenticateRequest, authorizeRequest, validateInput(`NONE`), getAllProducts);

// 1-> route to update a specific product in the database via _id
systemRouter.patch(`/product:productId`, authenticateRequest, authorizeRequest, validateInput(specificProductSchema, `PARAMS`), validateInput(`BODY`), findProductByIdAndUpdate);

// 1-> route to delete a specific product from database via _id
//systemRouter.delete(`/product:productId`, authenticateRequest, authorizeRequest, validateInput(specificProductSchema, `PARAMS`), deleteSystemRole);


// exporting router as a module
module.exports = {

  systemRouter

};