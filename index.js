const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({ path: 'variables.env'});
const conectarDB = require('./config/db');
conectarDB();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json({extended: true}));
//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));
app.listen(PORT,() => {
    console.log("listen on port "+ PORT);
});