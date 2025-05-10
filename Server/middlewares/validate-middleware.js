const { Schema } = require("zod");

const validate = (Schema) => async (req, res, next) => {
try{
const parseBody = await Schema.parseAsync(req.body);
req.bosy = parseBody;
next();
}catch(err){
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    const status = 400;

    const error = {
        status,
        message,
        extraDetails,
    };
    console.log(error);
    next(error);
}
};

module.exports = validate;