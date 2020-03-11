const express = require('express')
const routes = express.Router()
const admins = require('./controllers/admins')
const recipes = require('./controllers/recipes')


routes.get("/admin/recipes", admins.index); // Mostrar a lista de receitas
/* routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita */

/* routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita */


routes.get("/", recipes.index)
routes.get("/recipes", recipes.showAll)
routes.get("/recipes/:id", recipes.show)

module.exports = routes
