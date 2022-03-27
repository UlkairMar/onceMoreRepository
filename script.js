const  baseCoffeeURL = "https://api.sampleapis.com/coffee";
let coffeeList = [];
let description = document.querySelector(".description");
let ingredients = document.querySelector(".ingredients");

function reloadCard() {
    for(let i in coffeeList) {
        if(this.id === coffeeList[i].id){
            description.textContent = coffeeList[i].description;
            ingredients.innerHTML = '';
            for(let j in coffeeList[i].ingredients){
                ingredients.innerHTML += `<li class="item">${coffeeList[i].ingredients[j]}</li>`;
            }
        }
    }
}

function testScript() {
    console.log(this.id);
}

let button = document.querySelectorAll("button");

async function getCoffee(type) {
    let data = await fetch(`${baseCoffeeURL}/${type}`);
    let content = await data.json();
    //console.log(content);

    let hotCoffeeList = document.querySelector(`.${type}`);

    for(let i in content) {
        hotCoffeeList.innerHTML += `
            <li class="drink"><button id="${type}${content[i].id}">${content[i].title}</button></li>
        `;
        coffeeList.push({
            id: `${type}${content[i].id}`,
            title: `${content[i].title}`,
            description: `${content[i].description}`,
            ingredients: content[i].ingredients
        });
    }
    console.log(coffeeList);

    let buttons = document.querySelectorAll("button");

    for (let i in buttons) {
        buttons[i].onclick = reloadCard;
    }

   //buttons.forEach(this.onclick = testScript());
}

getCoffee("hot");
getCoffee("iced");


