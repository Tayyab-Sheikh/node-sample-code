const Joi = require(`joi`);

//importing require custom data validators
const {objectValidation} = require(`../helpers/joi.helpers`);


// defining validation schema for fetching a specific user
const specificSUserSchema = Joi.object({

    userId: Joi.string().custom(objectValidation, `User ID Validation`).required()
  
});

// defining validation schema for fetching a specific product
const specificProductSchema = Joi.object({

    prodId: Joi.string().custom(objectValidation, `User ID Validation`).required()

});

// defining validation schema for fetching a specific order
const specificOrderSchema = Joi.object({

    orderId: Joi.string().custom(objectValidation, `User ID Validation`).required()
  
});

// exporting modules
module.exports = {
    specificSUserSchema,
    specificProductSchema,
    specificOrderSchema
};



