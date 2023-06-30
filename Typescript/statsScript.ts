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
  stats: Array<{
    base_stat: number;
  }>;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokeName = urlParams.get("name");

if (pokeName) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data: pokeInfo) => {
      // Get image
      const img = document.getElementById("statsImg") as HTMLImageElement;
      img.src = data.sprites.other["official-artwork"].front_default;
      img.alt = pokeName;

      // Get name
      const name = document.getElementById("name") as HTMLElement;
      name.innerHTML = pokeName;

      // Get health
      const healthValue = data.stats[0].base_stat;
      const health = document.getElementById("health") as HTMLElement;
      health.setAttribute("value", healthValue.toString());

      // Get attack
      const attackValue = data.stats[1].base_stat;
      const attack = document.getElementById("attack") as HTMLElement;
      attack.setAttribute("value", attackValue.toString());

      // Get defense
      const defenseValue = data.stats[2].base_stat;
      const defense = document.getElementById("defense") as HTMLElement;
      defense.setAttribute("value", defenseValue.toString());

      // Get special attack
      const spAttackValue = data.stats[3].base_stat;
      const spAttack = document.getElementById("spAttack") as HTMLElement;
      spAttack.setAttribute("value", spAttackValue.toString());

      // Get special defense
      const spDefenseValue = data.stats[4].base_stat;
      const spDefense = document.getElementById("spDefense") as HTMLElement;
      spDefense.setAttribute("value", spDefenseValue.toString());

      // Get speed
      const speedValue = data.stats[5].base_stat;
      const speed = document.getElementById("speed") as HTMLElement;
      speed.setAttribute("value", speedValue.toString());

      // Get primary and secondary types
      const primaryType = data.types[0].type.name;
      const secondaryType = data.types[1]?.type.name || "";

      // Display types
      const primaryTypeElement = document.getElementById(
        "primaryType"
      ) as HTMLElement;
      const secondaryTypeElement = document.getElementById(
        "secondaryType"
      ) as HTMLElement;
      primaryTypeElement.innerHTML = primaryType;
      if (secondaryType) {
        secondaryTypeElement.innerHTML = secondaryType;
      } else {
        secondaryTypeElement.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Error fetching Pokémon details:", error);
    });

  // Go back button
  document.getElementById("go-back")?.addEventListener("click", () => {
    history.back();
  });
}
