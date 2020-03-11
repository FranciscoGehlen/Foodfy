//const fs =  require('fs')
const data = require('../data.json')

exports.index = function(req, res){
    return res.render("admin/index", {items: data.recipes})
}

exports.create = function(req, res){
    return res.render('admins/create')
}

exports.post = function(req, res){

    //get keys and put it in an array
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    let id = 1
    const lastAdmin = data.admins[data.admins.length - 1]
    
    if (lastAdmin) {
        id = lastAdmin.id + 1
    }

    

    data.admins.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/admins")
    })

    // return res.send(req.body)
}

exports.show = function(req, res){
    const { id } = req.params

    const foundAdmin = data.admins.find(function(admin){
        return admin.id == id
    })

    if (!foundAdmin) return res.send("Admin not found")

    

    const admin = {
        ...foundAdmin,
        age: age(foundAdmin.birth),
        services: foundAdmin.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundAdmin.created_at),
    }

    return res.render("admins/show", {admin})
}

exports.edit = function(req, res){

    const { id } = req.params

    const foundAdmin = data.admins.find(function(admin){
        return admin.id == id
    })

    if (!foundAdmin) return res.send("Admin not found")

    const admin = {
        ...foundAdmin,
        birth: date(foundAdmin.birth).iso
    }
    
    return res.render('admins/edit', { admin })
}

exports.put = function (req, res){
    const { id } = req.body
    let index = 0

    const foundAdmin = data.admins.find(function(admin, foundIndex){
        if(id == admin.id){
            index = foundIndex
            return true
        }
    })

    if (!foundAdmin) return res.send("Admin not found")

    const admin = {
        ...foundAdmin,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.admins[index] = admin

    fs.writeFile("data.json", JSON.stringify(data,null,4), function(err){
        if (err) return res.send("Write error!")

        return res.redirect(`/admins/${id}`)
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