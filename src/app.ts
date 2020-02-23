import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Application, Request, Response } from "express";


import Article from "./server";




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

/*

export let allBooks = (req: Request, res: Response) => {
    let books = Article.find((err: any, books: any) => {
      if (err) {
        res.status(200).send("Error!");
      } else {
        res.status(200).send(books);
      }
    });
  };

  export let getBook = (req: Request, res: Response) => {
    let book = Article.findById(req.params.id, (err: any, book: any) => {
      if (err) {
        res.status(200).send(err);
      } else {
        res.status(200).send(book);
      }
    });
  };
  
  export let deleteBook = (req: Request, res: Response) => {
    let book = Article.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully Deleted Book");
      }
    });
  };

  */

 var fs = require('fs');
 var contents = fs.readFileSync('articles.json', 'utf8');
 console.log(contents);
  

  
  export let addBook = (req: Request, res: Response) => {
    var book = new Article(req.body);
    book.save((err: any) => {
      if (err) {
        res.status(400).send(err);
        console.log("AAfdsafsafdasfdAAA");
      } else {
        res.status(200).send(book);
        console.log("AAAAA");
      }
    });
  };

  export let updateBook = (req: Request, res: Response) => {
    console.log(req.body);
    let book = Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, book: any) => {
        console.log("AAACCCCCCCCAA");
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated book!");
        }
      }
    );
  };


//app.get("/articles", allBooks);
//app.get("/articles/:id", getBook);
app.post("/articles", addBook);
app.put("/article/:id", updateBook);
//app.delete("/article/:id", deleteBook);

/*
app.post("/articles", (req, res) => {
    res.status(200).send({
        "title" : "The title",
        "subtitle" : "The subtitle",
        "body" : "The body of the article",
        "author" : "The author's full name"
    });
});

app.put("/articles/:id", (req, res) => {
   
    res.status(200).send({
        "title" : "The title",
        "subtitle" : "The subtitle",
        "body" : "The body of the article",
        "author" : "The author's full name"
    });
});

*/





app.use((req: Request, res: Response) => {
    res.status(500).send({
        status: 500,
        message: "Not Implemented"
    });
});

export { app, port }
