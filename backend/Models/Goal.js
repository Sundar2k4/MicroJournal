const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title : {type:String,required:true},
    iscompleted: {type:Boolean, default:false},
});

const goalSchema = new mongoose.Schema({
    goal : {type:String,required:true},
    duedate: {type:Date},
    subtasks: [subtaskSchema],
});

module.exports = mongoose.model('Goal',goalSchema);