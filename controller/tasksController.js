const { validationResult } = require("express-validator");
const Projects = require("../Model/Projects");
const Tasks = require("../Model/Tasks");
exports.getTasks =async(req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { project_id } = req.query;
        const existProject = await Projects.findById(project_id);
        if(!existProject) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existProject.author.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        // Obtener las tareas por proyecto
        const tasks = await Tasks.find({ project_id }).sort({ date: -1 });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
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
        const task = {}
        task.task_name = req.body.task_name;
        task.state = req.body.state;
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
        let task = await Tasks.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg: 'task not found'});
        }        
        // delete
        await Tasks.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Task deleted'})
    }
    catch (error) {
        console.log(error);
        res.json({"msg": "there was an error"});
    }

}
