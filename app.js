//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const PORT = process.env.PORT | 8080;
mongoose.connect('mongodb+srv://admin:admin@cluster0.krilcns.mongodb.net/blogDB')

const postsSchema = {
    title: String,
    content: String
};

const Post = mongoose.model('Post', postsSchema);


const contactContent = "Ayush Kumar"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    Post.find().then((posts) => res.render("home", {
                startingContent: homeStartingContent,
                posts: posts
            }
        )
    );
});

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
            title: req.body.postTitle,
            content: req.body.postBody
        }
    );

    post.save().then(() => res.redirect("/"));

});

app.get("/posts/:postId", function (req, res) {
    const postId = req.params.postId;
    Post.findOne({_id: postId}).then((post) => res.render("post", {
                title: post.title,
                content: post.content
            }
        )
    );


});

app.listen(PORT, function () {
    console.log("Server started on port "+PORT);
});
