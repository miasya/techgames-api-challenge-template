import { app, port } from "./app";
import mongoose from "mongoose";

let dbUrl = "";

(process.env.DB_URL)
    ? dbUrl = process.env.DB_URL
    : dbUrl = "mongodb://mongo:27017/techgames-template";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const server = app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});




export interface IBook extends mongoose.Document {
    title: string;
    subtitle: string;
    body: string;
    author: string;
}

export const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle:{ type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
});

const Article = mongoose.model<IBook>("Article", BookSchema);

export default Article;

export { server };