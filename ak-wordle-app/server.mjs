import { createRequestHandler } from "@remix-run/express";
import express from "express";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

app.listen(3611, () => {
  console.log("App listening on http://localhost:3611");
});

/**
 * Compare the guess of a user to the operator of the day
 * 
 */
app.post('/compare', function(req, res){
  console.log(req)
});

/**
 * Get the stats of todays operator of the day
 */
app.get('/stats', function(req, res){

});

