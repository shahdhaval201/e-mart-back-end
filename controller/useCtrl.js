const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jsonToken");
const validateMongodbId = require("../utils/validateMongodbid");
const {generateRefreshToken} = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

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

        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser?._id, {
            refreshToken: refreshToken,
        },{new:true});


        res.cookie("refreshToken", refreshToken, {httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
        })

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

// Handle Refresh Token

const handleRefreshToken = asyncHandler(async (req, res) => {

   const cookie = req.cookies;

   const refreshToken = cookie?.refreshToken;

   if(!refreshToken){
    throw new Error("No Refresh Token")
   }
   const user = await User.findOne({refreshToken});
   console.log(user)
   if(!user){
    throw new Error("Invalid Refresh Token")
   }

   jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if(err || user.id !== decoded.id){
        throw new Error("Invalid Refresh Token")
    }
        const accessToken = generateToken(user?._id)
        res.json({accessToken})
}) 
   
 })

 // Logout functionality


 const logout = asyncHandler(async (req,res) => {

    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});

    if(!user) {
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate({refreshToken},{
        refreshToken: ""
    })
    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: true
    })

    res.sendStatus(204);
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



module.exports = {createUser,loginUserCtrl,getAllUser,getUser,deleteUser,updatedUser,blockedUser,unblockedUser,handleRefreshToken,logout};