const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jsonToken");
const validateMongodbId = require("../utils/validateMongodbid");


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

const getAllUser = asyncHandler(async (req, res) => {

    try {
        const getUsers =  await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }

})

const getUser = asyncHandler(async (req,res) => {
    
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const getUser = await User.findById(id)
        res.json({getUser})
    } catch (error) {
        throw new Error(error)
    }
})

const updatedUser = asyncHandler(async(req,res) => {

const {_id} = req.user;
validateMongodbId(_id)

try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
    }, {new:true})
    res.json({updatedUser})
} catch (error) {
    throw new Error(error)
}
})

const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const deleteUser =  await User.findByIdAndDelete(id)
        res.json({deleteUser})
    } catch (error) {
        throw new Error(error)
    }
})

const blockedUser =  asyncHandler(async (req,res) => {
const {id} = req.params;
validateMongodbId(id)
try {
    const block = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})
    
    res.json({message: "User is blocked"})
} catch (error) {
    throw new Error(error)
}
})

const unblockedUser =  asyncHandler(async (req,res) => { 
    const {id} = req.params;
    validateMongodbId(id)
    try {
        const unBlock = await User.findByIdAndUpdate(id,{isBlocked:false},{new:true})
    res.json({
        message: "User is unblocked"
    })
    } catch (error) {
        throw new Error(error)
    }
    })



module.exports = {createUser,loginUserCtrl,getAllUser,getUser,deleteUser,updatedUser,blockedUser,unblockedUser};