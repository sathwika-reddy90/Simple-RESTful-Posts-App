const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuid4 } = require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuid4(),
        username:"sathwika",
        content:"lets do it!",
    },
    {
        id:uuid4(),
        username:"sreyank",
        content:"i got into IIT",
    },
    {
        id:uuid4(),
        username:"dharmi baby",
        content:"need more money",
    },
    {
        id:uuid4(),
        username:"kavi",
        content:"happy family",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuid4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    if (!post) {
        return res.send("Post not found!");
    }
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    console.log(post);
    //res.send("patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    //res.send("deleted success");
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to port:8080");
});