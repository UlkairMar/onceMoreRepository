const  baseCoffeeURL = "https://api.sampleapis.com/coffee";
const description = document.querySelector(".description");
const ingredients = document.querySelector(".ingredients");
let coffeeList = [];

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

async function getCoffee(type) {
    const data = await fetch(`${baseCoffeeURL}/${type}`);
    const content = await data.json();
    const CoffeeList = document.querySelector(`.${type}`);

    for(let i in content) {
        CoffeeList.innerHTML += `
            <li class="drink"><button id="${type}${content[i].id}">${content[i].title}</button></li>
        `;
        coffeeList.push({
            id: `${type}${content[i].id}`,
            title: `${content[i].title}`,
            description: `${content[i].description}`,
            ingredients: content[i].ingredients
        });
    }
    const buttons = document.querySelectorAll("button");
    for (let i in buttons) {
        buttons[i].onclick = reloadCard;
    }
}

getCoffee("hot");
getCoffee("iced");
