const User = require("../models/user-model");
const bcrypt = require('bcrypt');

//*_______________________
// Home Logic
//*_______________________
const home = async (req, res) => {
    try {
        res.status(200).send("Hello This ia Akash");
    } catch (err) {
        const status = 500;
        const message = "Internal Server Error";

        const error = {
            status,
            message,
        };
        console.log(error);
        next(error);
        
    }
}

//*_______________________
// Register Logic
//*_______________________

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;
        
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const userCreated = await User.create({ username, email, phone, password });


      res.status(201).json({
        msg: "registration successfull",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),

      });
    } catch (er) {
        const status = 500;
        const message = "Internal Server Error";

        const error = {
            status,
            message,
        };
        console.log(error);
        next(error);
    }
}

//*_______________________
// Login Logic
//*_______________________
const login = async (req,res)=>{
    try {
        const{email,password}=req.body;

        useExist = await User.findOne({ email });
        if (!useExist){
            return res.status(400).json({message: " Invalid Credentials"});
        }


        const user = await useExist.comparePassword(password);

        if(user){
            res.status(200).json({
                msg: "Login successfull",
                token: await useExist.generateToken(),
                userId: useExist._id.toString(),
        
              });
        }else{
            res.status(402).send({message: "Invalid email or password"});
        }

    }catch (err) {
        const status = 500;
        const message = "Internal Server Error";

        const error = {
            status,
            message,
        };
        console.log(error);
        next(error);
    }
}


//*_______________________
// user Logic
//*_______________________
const user = async(req,res) =>{
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});

    }catch(error){
        console.log(`error form ${error}`);
    }
}

module.exports = { home, register, login, user };
