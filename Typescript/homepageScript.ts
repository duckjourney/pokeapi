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
}

const $container = document.getElementById("container") as HTMLElement;
const API = "https://pokeapi.co/api/v2/pokemon/";
const pokemonList: pokeInfo[] = [];

// Retrieve pokemons from the API

for (let i = 1; i <= 251; i++) {
  const url = API + i;
  fetch(url)
    .then((response) => response.json())
    .then((result: pokeInfo) => {
      pokemonList.push(result);
      if (pokemonList.length === 251) {
        showPokemonList();
      }
    })
    .catch((error) => console.log("error", error));
}

// Sort results, as they come unordered

function showPokemonList():void {
  
  let $row = createRow();

  pokemonList.forEach((pokemon:any) => {
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

function showData(pokemon:pokeInfo, $row:HTMLElement):void {
  const $column = document.createElement("div");
  $column.classList.add(
    "column",
    "is-2",
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
  $link.href = "../stats.html";

  $link.appendChild($name);
  $link.appendChild($id);
  $link.appendChild($img);

  $column.appendChild($link);

  $row.appendChild($column);
}


