const input = document.getElementById("pokemonName");
const button = document.getElementById("searchPokemon");
const imgElement = document.getElementById("pokemonSprite");
const errorMsg = document.getElementById("errorMsg");
const infoBox = document.getElementById("pokemonInfo");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

async function fetchData() {
    try {
        const pokemonName = input.value.trim().toLowerCase();
        if (!pokemonName) return;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Pokemon not found");

        const data = await response.json();

        imgElement.src = data.sprites.front_default;
        imgElement.style.display = "block";
        errorMsg.style.display = "none";

        const types = data.types.map(t => t.type.name).join(", ");


        const moves = data.moves
            .slice(0, 5)
            .map(m => `${m.move.name}`)
            .join(", ");


        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const generation = speciesData.generation.name.replace("generation-", "").toUpperCase();


        infoBox.innerHTML = `
      <h2 style="margin-top:20px;"> ${data.name.toUpperCase()} </h2>
      <p> <strong> Type(s): </strong> ${types}</p>
      <p> <strong> Generation: </strong> ${generation} </p>
      <p> <strong> Some Moves: </strong>  </p>
      ${moves} 
     
    `;

    } catch (error) {
        imgElement.style.display = "none";
        infoBox.innerHTML = "";
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
    }
}

button.addEventListener("click", fetchData);
