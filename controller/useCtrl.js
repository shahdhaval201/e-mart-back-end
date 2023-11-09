const User = require("../models/userModel");

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.find(email)
    if(!findUser){
        // Create a new user
        const newUser = User.create(req.body)
        res.json(newUser)
    }else{
        res.json({message:"User already exists", success:false})
    }
}

module.exports = createUser;