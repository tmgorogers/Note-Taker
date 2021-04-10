//Dependencies

const express = require('express');
const http = require("http");
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// create application/urlencoded parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use("/api",apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>{
    console.log("App listening on port" 
    + PORT);

});
