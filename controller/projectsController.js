const Projects = require("../Model/Projects");
const { validationResult } = require("express-validator");
exports.addProject = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errores: errors.array() })
    }
    try {
        const newProject = new Projects(req.body);
        newProject.author = req.user.id;
        newProject.save();
        res.send("add ok");
    } catch (err) {
        console.log(err);
    }
}
exports.getProjects = async (req, res) => {
    try {
        const projects = await Projects.find({author: req.user.id}).sort({date: -1});
        res.json({projects});
    } catch (err) {
        
    }
}
exports.updateProject = async (req, res) => {
    const newProject = {};
    const {project_name} = req.body;
    if(project_name){
        newProject.project_name = project_name;
    }
    try {
        let project = await Projects.findById(req.params.id);
        if(!project){
           return res.status(404).json({"msg": "project not found"});
        }
        if(project.author.toString() !== req.user.id){
            res.status(401).json({"msg": "not authorized"});
        }
        //update
        project = await Projects.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true});
        return res.json({project});
    } catch (err) {
        console.log(err);
    }
}
exports.deleteProject = async(req,res) => {
    try {
        let project = await Projects.findById(req.params.id);
        if(!project){
           return res.status(404).json({"msg": "project not found"});
        }
        if(project.author.toString() !== req.user.id){
            res.status(401).json({"msg": "not authorized"});
        }
        //delete
        project = await Projects.findOneAndDelete({_id: req.params.id});
        return  res.status(200).json({"msg": "project deleted"});
    } catch (error) {
        console.log(error)
    }
}