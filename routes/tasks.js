const express = require('express');
const { check } = require('express-validator');
const router = express.Router()
const tasksController = require("../controller/tasksController");
const auth = require("../middleware/auth");
router.get('/',
 auth, 
 [ check('project_id', 'the project is required').not().isEmpty()],
tasksController.getTasks);
router.post('/',
auth, 
[ check('task_name', 'the name of task is required').not().isEmpty()],
tasksController.addTask);
router.put('/:id',auth, tasksController.updateTask);
router.delete('/:id', auth, tasksController.deleteTask)
module.exports = router;