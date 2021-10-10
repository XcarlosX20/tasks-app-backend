const mongoose = require("mongoose");
const TasksSchema = mongoose.Schema({
    task_name: {
        type: String,
        require: true,
        trim: true,
    }, 
    state: {
        type: Boolean,
        default: false,
    },   
    project_id: {
        type:  mongoose.Types.ObjectId,
        ref: 'Projects'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Tasks", TasksSchema);