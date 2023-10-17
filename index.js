const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "Ramkrushna",
        content: "CSE student at BIGCE"
    },
    {
        id: uuidv4(),
        username: "Ganesh",
        content: "CSE student at BIGCE"
    }
]
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
    // res.send("")
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((P) => P.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((P) => P.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((P) => P.id === id);
    res.render("update.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((P) => P.id !== id);
    res.redirect("/posts");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});

