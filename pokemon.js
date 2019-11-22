











class pokemon {
    constructor (id, name) {
        this.id = id
        this.name = name
        // this.types = types
    }
}

const Sinnamon = new pokemon('images\900.png', 'Sinnamon')

const newButton2 = document.querySelector("#ultimatePokemon")
newButton2.addEventListener('click', function() {
    populateDOM(Sinnamon)
})

const newButton = document.querySelector('#newPokemon')
newButton.addEventListener('click', function() {
    let pokeId = prompt("Please enter a pokemon id, you stud.");
    if (pokeId > 0 && pokeId <= 807) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(result => {
        populateDOM(result)
    })
} else { 
        alert('there are no Pokemon with that ID. Choose another one')
 }
})

function getHP(pokemonID) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then(pokemon => {
        const HP = pokemon.stats.find(element => {
            return element.stat.name === "hp"
        })
        return HP.base_stat
    })
}


async function getAPIData(url) {
try {
    
    const response = await fetch(url)
    const data = await response.json()
    const HP = await getHP(data.id)
    data.hp = HP
    return data
} catch (error) {
    console.error(error)
}
}

//now use the reutrned async data
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25')
.then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url)
        .then(pokedata => {
           populateDOM(pokedata)
        })
    }
    
})

let mainArea = document.querySelector('main')


function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')


    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)


    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')


    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
 
    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener( 'click', function() {
        pokeCard.classList.toggle('is-flipped');
      });
}


function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card_face--front')
    let name = document.createElement('h3')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)
    pokeFront.appendChild(name)
    //name.textContent = `${data.name} height: ${data.height}`

    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`

        
    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
}

function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class', 'card_face--back')
    let pokeOrder = document.createElement('p')
    let pokeHP = document.createElement('h5')
    pokeOrder.textContent = `#${data.order} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pokeHP.textContent = "Base Hit Points: " + data.hp
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
    //pokeBack.appendChild(types)
}


/*<div class="scene">\
    <div class="card">
        <div class="card_face card_face--front">front</div>
        <div class="card_face card_face--back">back</div>
    </div>
</div>*/

function getPokeNumber(id) {
    if(id < 10) return `00${id}`
    if(id > 9 && id < 100) {
        return `0${id}`
    } else return id
}

