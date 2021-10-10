const { validationResult } = require("express-validator");
const Projects = require("../Model/Projects");
const Tasks = require("../Model/Tasks");
exports.getTasks =async(req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errores: errors.array() })
    }
    let project = await Projects.findById(req.body.project_id);
    if(!project) res.status(404).json({"msg": "Project not found"});
    if(project.author.toString() !== req.user.id){
        res.status(401).json({"msg": "not authorized"});
    }
    //filter
    const {project_id} = req.body;
    let task_of_project = await Tasks.find({project_id});
    if(!task_of_project) res.status(404).json({"msg": "task not found"})
    return res.json({task_of_project});
}
exports.addTask = async(req, res) => {
    try {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errores: errors.array() })
    }
    let project = await Projects.findById(req.body.project_id);
    if(!project) res.status(404).json({"msg": "Project not found"});
    if(project.author.toString() !== req.user.id){
        res.status(401).json({"msg": "not authorized"});
    }
    //create the task
    const task = new Tasks(req.body);
    await task.save();
    res.json({task});
    } catch (error) {
        console.log(error)
    }
}
exports.updateTask = async(req, res) => {
    //change the state of task
    try {
        const {task_name, state } = req.body;
        const task = {}
        if(task_name) task.task_name = req.body.task_name;
        if(state) task.state = req.body.state;
        //auth user
        let project = await Projects.findById(req.body.project_id);
        if(!project) res.status(404).json({"msg": "Project not found"});
        if(project.author.toString() !== req.user.id){
        res.status(401).json({"msg": "not authorized"});
    }   //update task
        const existingTask = await Tasks.findOneAndUpdate({_id:req.params.id}, task, {"new": true});
        return res.json({existingTask});
        
    } catch (error) {
        console.log(error);
        res.json({"msg": "there was an error"});
    }

}
exports.deleteTask = async(req, res) => {
    //change the state of task
    try {
        //auth user
        let project = await Projects.findById(req.body.project_id);
        if(!project) res.status(404).json({"msg": "Project not found"});
        if(project.author.toString() !== req.user.id){
        res.status(401).json({"msg": "not authorized"});
    }
        //delete task
        await Tasks.findOneAndRemove({_id:req.params.id});
        return res.json({"msg": "deleted"});
    } catch (error) {
        console.log(error);
        res.json({"msg": "there was an error"});
    }

}