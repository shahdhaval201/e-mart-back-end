const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jsonToken");

const createUser = asyncHandler(async (req, res) => {

    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user){
        // Create a new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User already exists")
    }
})

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email && password

    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        })
    }else{
        throw new Error("Invalid Credentials")
    }

})

module.exports = {createUser,loginUserCtrl};