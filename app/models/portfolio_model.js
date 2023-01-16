const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    pcategory:{
        type:String
    },
    pname:{
        type:String
    },
    uploadImage:{
        type:Array
    }, 
    ptitle:{
        type:String
    },
    pdate:{
        type:Date
    },
    url:{
        type:String
    }
})

module.exports = new mongoose.model('Portfolio',portfolioSchema,'Portfolio')
