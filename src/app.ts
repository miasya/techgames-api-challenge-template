import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Application, Request, Response } from "express";

dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

if (port == "") {
    // tslint:disable-next-line:no-console
    console.log("Missing environment variables for configuration (check .env.example and create a .env)")
    process.exit(1);
}

app.get("/status", (req, res) => {
    res.status(200).send({
        "status" : "Up"
    });
});

app.get("/articles", (req, res) =>
{
    var fs = require('fs');
    var contents = fs.readFileSync('articles.json', 'utf8');
    console.log(contents);

    //if () {
    //    res.status(400).send({
    //        "status": "Missing"
    //    });
    //} else {
    res.json(200).send({
        contents
        });
    //res.end(JSON.stringify(contents));

    //}

});

app.use((req: Request, res: Response) => {    
    res.status(500).send({
        status: 500,
        message: "Not Implemented"
    });
});

export { app, port }
