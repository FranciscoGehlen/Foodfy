const recipes = document.querySelectorAll('.recipes-item')

for (let recipe of recipes){
    recipe.addEventListener("click", function(){
        var recipeId = recipe.getAttribute("id");
        window.location.href = `http://localhost:5000/recipes/${recipeId}`
    })
}

// Navbar change
const currentPage = location.pathname
const navBar = document.querySelector(".nav")
const navImg = document.getElementById("logo")
if (currentPage.includes("admin")){
    navBar.classList.add("adm")
    navImg.src = "/assets/logoadm.png"
}

// Buttons
function btnToggle1(){
    var ingList = document.getElementById('ing-list')
    var btn1 = document.getElementById('btn1')
    if(ingList.style.display === 'block'){
        ingList.style.display = 'none';
        btn1.innerHTML = 'MOSTRAR'
    } else {
        ingList.style.display = 'block';
        btn1.innerHTML = 'ESCONDER'
    }
}

function btnToggle2(){
    var prepList = document.getElementById('prep-list')
    var btn2 = document.getElementById('btn2')
    if(prepList.style.display === 'block'){
        prepList.style.display = 'none';
        btn2.innerHTML = 'MOSTRAR'
    } else {
        prepList.style.display = 'block';
        btn2.innerHTML = 'ESCONDER'
    }
}

function btnToggle3(){
    var infoList = document.getElementById('info-list')
    var btn3 = document.getElementById('btn3')
    if(infoList.style.display === 'block'){
        infoList.style.display = 'none';
        btn3.innerHTML = 'MOSTRAR'
    } else {
        infoList.style.display = 'block';
        btn3.innerHTML = 'ESCONDER'
    }
}

// adm buttons
function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}
  
document.querySelector(".add-ingredient").addEventListener("click", addIngredient);


function addStep() {
    const steps = document.querySelector("#preparation");
    const fieldContainer = document.querySelectorAll(".step");
  
    // Realiza um clone do último stepe adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    steps.appendChild(newField);
}

document.querySelector(".add-step").addEventListener("click", addStep);

