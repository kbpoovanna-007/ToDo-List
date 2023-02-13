const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


//2 lists for different webpages
const lists = ["Butter", "Apple", "Banana"];
const workLists = [];


const date = require(__dirname + "/newDate.js");
//GET for /
app.get("/",function(req,res)
{
   let day = date.getDay();
   res.render("index",{listTitle : day , newList : lists});
});


//POST for /
app.post("/",function(req,res){
console.log(req.body);
  const list = req.body.list;
  const item = req.body.newItem;

  if(list==="Work List"){
    workLists.push(item);
    res.redirect("/work");
  }
  else{
    lists.push(item);
    res.redirect("/");
  }
})


//GET for /work
app.get("/work",function(req,res){
  res.render("index",{listTitle : "Work List", newList : workLists });

})



//GET for /about
app.get("/about",function(req,res){
  res.render("about");
})

//SERVER
app.listen(3000,function(req,res){
  console.log("Listening at port 3000");
});
