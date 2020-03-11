//const fs = require('fs')
const data = require ('../data.json')

exports.index = function(req, res){
    return res.render("recipes/home", {items: data.recipes})
}

exports.showAll = function(req, res){
    return res.render("recipes/show", { items: data.recipes})
}

exports.show = function (req, res) {
    const {id} = req.params;
  
    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })
    if (!foundRecipe){
        return res.send("Recipe not found!")
    }

    const recipe = {
        ...foundRecipe
    }
    return res.render("recipes/recipe", { item: recipe })
}