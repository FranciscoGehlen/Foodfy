const fs =  require('fs')
const data = require('../data.json')

exports.index = function(req, res){
    return res.render("admin/index", {items: data.recipes})
}

exports.create = function(req, res){
    return res.render('admin/create')
}

exports.post = function(req, res){

    //get keys and put it in an array
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    let {image, title, author, ingredients, preparation, information} = req.body

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]
    
    if (lastRecipe) {
        id = lastRecipe.id + 1
    }

    

    data.recipes.push({
        id,
        image,
        title,
        author,
        ingredients, 
        preparation,
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })

    // return res.send(req.body)
}

exports.show = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Admin not found")

    

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/recipe", {item: recipe})
}

exports.edit = function(req, res){

    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Admin not found")

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/edit", {item: recipe})
}

exports.put = function (req, res){
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipes, foundIndex){
        if(id == recipes.id){
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Admin not found")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data,null,4), function(err){
        if (err) return res.send("Write error!")

        return res.redirect(`/admin/recipes/${id}`)
    })

}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredAdmins = data.admins.filter(function(admin){
        return admin.id != id
    })

    data.admins = filteredAdmins

    fs.writeFile("data.json", JSON.stringify(data,null,4), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/admins")
    })
}