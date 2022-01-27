// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
 import Router from "./routes/routes.js";
 import session from 'express-session';
 
// init express
const app = express();
 
// use express json
app.use(express.json());
 
// use cors
app.use(cors());
 
// use router
 app.use(Router);
 app.use(session({
  
    // It holds the secret key for session
    secret: 'email',
  
    // Forces the session to be saved
    // back to the session store
    resave: true,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))
// app.get("/about", function(req, res){
       
//     // req.session.key = value
//     req.session.name = 'GeeksforGeeks'
//     console.log(req.session.name)
//     return res.send("Session Set")
// })
   
// app.get("/session", function(req, res){
   
//     var name = req.session.name
//     console.log(name)
//     return res.send(name)
   
//     /*  To destroy session you can use
//         this function 
//      req.session.destroy(function(error){
//         console.log("Session Destroyed")
//     })
//     */
// })
  
app.listen(5000, () => console.log('Server running at http://localhost:5000'));

// const express = require('express');
// const mysql = require('mysql');

// const app = express();


// app.listen('3000', () => {
//     console.log("server run");
// })