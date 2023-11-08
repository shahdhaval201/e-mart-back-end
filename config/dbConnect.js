const {default: mongoose} = require("mongoose");

const dbConnect = () => {
   try {
    const connect = mongoose.connect("")
   } catch (error) {
    console.log("🚀 ~ file: dbConnect.js:7 ~ dbConnect ~ error:", error)
    
   }
}