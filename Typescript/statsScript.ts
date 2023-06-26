const $queryString = window.location.search;
const $urlParams = new URLSearchParams($queryString);
const pokeName = $urlParams.get('name');

if (pokeName) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  fetch(apiUrl) 
    .then((response) => response.json())
    .then((data) => {
      // Get image
      const $img = document.getElementById("statsImg") as HTMLImageElement;
      $img.src = data.sprites.other["official-artwork"].front_default;
      $img.alt = pokeName;
      // Get name
      const $name = document.getElementById("name") as HTMLElement;
      $name.innerHTML = pokeName;
      // Get health
      const healthValue = data.stats[0].base_stat;
      const $health = document.getElementById("health") as HTMLProgressElement;
      $health.setAttribute("value", healthValue);
      // Get attack
      const attackValue = data.stats[1].base_stat;
      const $attack = document.getElementById("attack") as HTMLProgressElement;
      $attack.setAttribute("value", attackValue);
      // Get defense
      const defenseValue = data.stats[2].base_stat;
      const $defense = document.getElementById("defense") as HTMLProgressElement;
      $defense.setAttribute("value", defenseValue);
      // Get special attack
      const spAttackValue = data.stats[3].base_stat
      const $spAttack = document.getElementById("spAttack") as HTMLProgressElement;
      $spAttack.setAttribute("value", spAttackValue);
      // Get special defense
      const spDefenseValue = data.stats[4].base_stat
      const $spDefense = document.getElementById("spDefense") as HTMLProgressElement;
      $spDefense.setAttribute("value", spDefenseValue);
      // Get speed
      const speedValue = data.stats[5].base_stat
      const $speed = document.getElementById("speed") as HTMLProgressElement;
      $speed.setAttribute("value", speedValue);
    })
    .catch((error) => {
      console.log('Error fetching Pokémon details:', error);
    });
} 



