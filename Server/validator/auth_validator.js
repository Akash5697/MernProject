const {z} = require('zod');

const loginsSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address."})
    .min(3,{message: "Email must be at least of 3 characters."})
    .max(255,{message: "Email must not be more than 255 characters."}),
    
    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(7,{message: "password must be at least of 3 characters."})
    .max(1024,{message: "password cant be grater than 1024 characters."}),
})

const signupSchema = loginsSchema.extend({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3,{message: "Name must be at least of 3 characters."})
    .max(255,{message: "Name must not be more than 255 characters."}),   
       
    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10,{message: "Phone must be at least of 10 characters."})
    .max(20,{message: "Phone must not be more than 20 characters."}),
    
});

module.exports = {signupSchema, loginsSchema};
