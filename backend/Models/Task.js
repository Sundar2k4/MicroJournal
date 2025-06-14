const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task : {type:String,required:true,unique:true}
})

module.exports = mongoose.model('Tasks',taskSchema);