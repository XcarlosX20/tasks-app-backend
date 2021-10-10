const express = require("express");
const router = express.Router();
const authController = require("../controller/projectsController");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
router.post('/', 
    auth,
    [
        check('project_name', 'the name of project is required').not().isEmpty()
    ],
    authController.addProject
);
router.get('/', auth, authController.getProjects);
router.put('/:id', 
[
    check('project_name', 'the name of project is required').not().isEmpty()
],
auth, authController.updateProject);
router.delete('/:id', auth, authController.deleteProject);
module.exports = router;