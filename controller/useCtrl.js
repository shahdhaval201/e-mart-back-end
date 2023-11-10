const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

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

module.exports = createUser;