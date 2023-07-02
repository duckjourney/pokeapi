interface pokeInfo {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

interface ApiResponse {
  results: PokemonType[];
}

interface PokemonType {
  name: string;
}

const $container = document.getElementById("container") as HTMLElement;
const API = "https://pokeapi.co/api/v2/pokemon/";
const pokemonList: pokeInfo[] = [];
const filter = document.getElementById("filter")

// Retrieve pokemons from the API

for (let i = 1; i <= 151; i++) {
  const url = API + i;
  fetch(url)
    .then((response) => response.json())
    .then((result: pokeInfo) => {
      pokemonList.push(result);
      if (pokemonList.length === 151) {
        showPokemonList();
      }
    })
    .catch((error) => console.log("error", error));
}

// Sort results, as they come unordered

function showPokemonList(): void {
  pokemonList.sort((a: pokeInfo, z: pokeInfo) => a.id - z.id);

  let $row = createRow();

  pokemonList.forEach((pokemon: any) => {
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

function showData(pokemon: pokeInfo, $row: HTMLElement): void {
  const $column = document.createElement("div");
  $column.classList.add(
    "column",
    "is-full-mobile",
    "is-3-tablet",
    "is-2-desktop",
    "has-text-centered",
    "has-background-white",
    "box",
    "pokemon"
  );

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
  const secondaryType = pokemon.types[1]?.type.name || "";
  $column.setAttribute("data-type", `${primaryType},${secondaryType}`);

  $link.appendChild($name);
  $link.appendChild($id);
  $link.appendChild($img);

  $column.appendChild($link);

  $row.appendChild($column);
}

// Search bar

const $searchInput = document.getElementById("searchInput") as HTMLInputElement;

if ($searchInput !== null) {
  $searchInput.addEventListener("input", () => {
    const searchText = $searchInput.value.toLowerCase();

    const pokemonToSearch = document.getElementsByClassName("pokemon");

    for (let i = 0; i < pokemonToSearch.length; i++) {
      const eachPokemon = pokemonToSearch[i] as HTMLElement;
      const pokemonName = eachPokemon.innerText.toLowerCase();
      if (pokemonName.includes(searchText)) {
        eachPokemon.style.display = "";
      } else {
        eachPokemon.style.display = "none";
      }
    }
  });
}
fetch("https://pokeapi.co/api/v2/type")
  .then((response) => response.json())
  .then((data: ApiResponse) => {
    const typeDropdown = document.getElementById(
      "type-dropdown"
    ) as HTMLElement;
    const dropdownContent = typeDropdown.querySelector(
      ".dropdown-content"
    ) as HTMLElement;

    // Populate the dropdown with the fetched types
    data.results.forEach((type: PokemonType) => {
      if (type.name !== "unknown" && type.name !== "shadow") {
        const item = document.createElement("a");
        item.classList.add("dropdown-item");
        item.textContent = type.name;
        item.dataset.type = type.name;
        dropdownContent.appendChild(item);
      }
    });

    dropdownContent.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('dropdown-item')) {
        const selectedType = target.dataset.type;
        if (selectedType) {
          filterPokemonsByType(selectedType);

          // Change filter button name to the selected type
          if (filter) { 
            filter.textContent = selectedType
          }
      
          // Collapse dropdown once a type is clicked
          const dropdown = document.querySelector('.dropdown') as HTMLElement;
          dropdown.classList.remove('is-active');
        }
      }
    });
  });

// Show Pokémon based on the selected type

function filterPokemonsByType(type: string) {
  const pokemonElements = document.querySelectorAll(".pokemon") as NodeListOf<HTMLElement>;

  pokemonElements.forEach((element) => {
    const pokemonTypes = element.dataset.type?.split(",") || [];

    if (pokemonTypes.includes(type) || type === "all") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}

// Make tghe dropdown open and close on click

document.addEventListener("DOMContentLoaded", () => {
  const dropdownTrigger = document.querySelector(
    ".dropdown-trigger button"
  ) as HTMLButtonElement;
  const dropdown = document.querySelector(".dropdown") as HTMLElement;
  dropdownTrigger.addEventListener("click", () => {
    dropdown.classList.toggle("is-active");
  });
});

// Reset filter

const resetFilterButton = document.getElementById(
  "reset-filter"
) as HTMLButtonElement;

resetFilterButton.addEventListener("click", () => {
  filterPokemonsByType("all");

  // Change filter button name back to default as no selected type
  if (filter) { 
    filter.textContent = "Select type"
  }
});
