const mongoose = require("mongoose");
const Projects = mongoose.Schema({
    project_name: {
        type: String,
        require: true,
        trim: true,
    },    
    author: {
        type:  mongoose.Types.ObjectId,
        ref: 'Users'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Projects", Projects);