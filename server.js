const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    return res.render("home", {items: recipes})
})

server.get("/recipes", function(req, res){
    return res.render("recipes", { items: recipes})
})

server.get("/recipes/:id", function (req, res) {
    const recipeId = req.params.id;
  
    const recipe = recipes.find(function(recipe){
        if (recipe.id == recipeId){
            return true
        }
    })
    if (!recipe){
        return res.send("Recipe not found!")
    }

    return res.render("recipe", { item: recipe })
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function(){
    console.log('Server is running')
})