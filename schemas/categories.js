var mongoose = require('mongoose');

//分类的表结构
module.exports = new mongoose.Schema({
    //分类名称
    name:String,
    //相同分类的数目
    num:{
        type:Number,
        default:0
   }
})