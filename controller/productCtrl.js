const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


const createProduct = asyncHandler(async (req,res) => {

    try {
        if(req.body.title){
             req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)

    } catch (error) {

        throw new Error(error)

    }
})

const updateProduct = asyncHandler(async (req,res) => {
    const {id} = req.params;

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new:true})
        res.json({updateProduct})
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req,res) => {

    const {id} = req.params;

    try {
        const deleteUser = await Product.findByIdAndDelete(id)
        res.json({deleteUser})
    } catch (error) {
        throw new Error(error)
    }

})



const getProduct = asyncHandler(async (req,res) => {
    
    const {id} = req.params;
    
    try {
        const findProduct = await Product.findById(id)
        res.json({findProduct})
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async (req,res) => { 
console.log(req.query)
    try {
        const products = await Product.find(req.query)
    res.json(products)
    } catch (error) {
        throw new Error(error)
    }

})


module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}

