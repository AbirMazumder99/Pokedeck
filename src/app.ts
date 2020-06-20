//Install TypeScript to compile into JavaScript: CLI -   npm install -g typescript
// tsconfig is a JSON file that helps configure TypeScript
// CLI: tsc --init

// Union Notation: Picks between HTMLElement or any
const container: HTMLElement | any = document.getElementById("app")
const pokemons: number = 100

// Defines the shape of a Pokemon Object
interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
    // Loop through the number of Pokemons
    for (let i = 1; i <= pokemons; i++) {
      getPokemon(i)
    }
}
// It might take time to fetch data; so we use async function that returns Promise of type void
const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json()
    const pokemonType: string = pokemon.types
      .map((poke: any) => poke.type.name)
      .join(", ")
    //Once all the data has been fetched
    // transformedPokemon mirrors the interface IPokeman
    const transformedPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: `${pokemon.sprites.front_default}`,
      type: pokemonType,
    }
  
    showPokemon(transformedPokemon) 
}

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
          <div class="card">
              <span class="card--id">#${pokemon.id}</span>
              <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
              <h1 class="card--name">${pokemon.name}</h1>
              <span class="card--details">${pokemon.type}</span>
          </div>
      `
    container.innerHTML += output
}
  
fetchData()

// Now we have to compile TS code to JS. CLI: tsc