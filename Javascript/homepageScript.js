"use strict";
const $container = document.getElementById("container");
const API = "https://pokeapi.co/api/v2/pokemon/";
const pokemonList = [];
const filter = document.getElementById("filter"); // Remove this in case of fire
// Retrieve pokemons from the API
for (let i = 1; i <= 151; i++) {
    const url = API + i;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
        pokemonList.push(result);
        if (pokemonList.length === 151) {
            showPokemonList();
        }
    })
        .catch((error) => console.log("error", error));
}
// Sort results, as they come unordered
function showPokemonList() {
    pokemonList.sort((a, z) => a.id - z.id);
    let $row = createRow();
    pokemonList.forEach((pokemon) => {
        showData(pokemon, $row);
    });
}
// Create rows as Bulma framework works with rows + columns
function createRow() {
    const $row = document.createElement("div");
    $row.classList.add("columns", "is-multiline");
    $container.appendChild($row);
    return $row;
}
// Create divs for every pokemon from the API
function showData(pokemon, $row) {
    var _a;
    const $column = document.createElement("div");
    $column.classList.add("column", "is-full-mobile", "is-3-tablet", "is-2-desktop", "has-text-centered", "has-background-white", "box", "pokemon");
    const $name = document.createElement("h1");
    $name.classList.add("title", "is-5", "has-text-centered");
    $name.textContent = pokemon.name;
    const $id = document.createElement("h2");
    $id.classList.add("subtitle", "is-5", "has-text-centered");
    $id.textContent = `#${pokemon.id}`;
    const $img = document.createElement("img");
    $img.classList.add("image", "is-128x128");
    $img.src = pokemon.sprites.other["official-artwork"].front_default;
    $img.alt = pokemon.name;
    const $link = document.createElement("a");
    $link.href = `./stats.html?name=${pokemon.name}`;
    const primaryType = pokemon.types[0].type.name;
    const secondaryType = ((_a = pokemon.types[1]) === null || _a === void 0 ? void 0 : _a.type.name) || "";
    $column.setAttribute("data-type", `${primaryType},${secondaryType}`);
    $link.appendChild($name);
    $link.appendChild($id);
    $link.appendChild($img);
    $column.appendChild($link);
    $row.appendChild($column);
}
// Search bar
const $searchInput = document.getElementById("searchInput");
if ($searchInput !== null) {
    $searchInput.addEventListener("input", () => {
        const searchText = $searchInput.value.toLowerCase();
        const pokemonToSearch = document.getElementsByClassName("pokemon");
        for (let i = 0; i < pokemonToSearch.length; i++) {
            const eachPokemon = pokemonToSearch[i];
            const pokemonName = eachPokemon.innerText.toLowerCase();
            if (pokemonName.includes(searchText)) {
                eachPokemon.style.display = "";
            }
            else {
                eachPokemon.style.display = "none";
            }
        }
    });
}
fetch("https://pokeapi.co/api/v2/type")
    .then((response) => response.json())
    .then((data) => {
    const typeDropdown = document.getElementById("type-dropdown");
    const dropdownContent = typeDropdown.querySelector(".dropdown-content");
    // Populate the dropdown with the fetched types
    data.results.forEach((type) => {
        if (type.name !== "unknown" && type.name !== "shadow") {
            const item = document.createElement("a");
            item.classList.add("dropdown-item");
            item.textContent = type.name;
            item.dataset.type = type.name;
            dropdownContent.appendChild(item);
        }
    });
    dropdownContent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('dropdown-item')) {
            const selectedType = target.dataset.type;
            if (selectedType) {
                filterPokemonsByType(selectedType);
                // Remove this in case of fire
                if (filter) {
                    filter.textContent = selectedType;
                }
                // Collapse dropdown once a type is clicked
                const dropdown = document.querySelector('.dropdown');
                dropdown.classList.remove('is-active');
            }
        }
    });
});
// Show Pokémon based on the selected type
function filterPokemonsByType(type) {
    const pokemonElements = document.querySelectorAll(".pokemon");
    pokemonElements.forEach((element) => {
        var _a;
        const pokemonTypes = ((_a = element.dataset.type) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
        if (pokemonTypes.includes(type) || type === "all") {
            element.style.display = "";
        }
        else {
            element.style.display = "none";
        }
    });
}
// Make tghe dropdown open and close on click
document.addEventListener("DOMContentLoaded", () => {
    const dropdownTrigger = document.querySelector(".dropdown-trigger button");
    const dropdown = document.querySelector(".dropdown");
    dropdownTrigger.addEventListener("click", () => {
        dropdown.classList.toggle("is-active");
    });
});
// Reset filter
const resetFilterButton = document.getElementById("reset-filter");
resetFilterButton.addEventListener("click", () => {
    filterPokemonsByType("all");
    // Remove this in case of fire
    if (filter) {
        filter.textContent = "Select type";
    }
});
