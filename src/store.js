import { fetchAllPokemons } from '@/services'

let pokemons
let currentPokemonName

export const setCurrentPokemon = pokemon => (currentPokemonName = pokemon.name)

export const getCurrentPokemonIndex = () => pokemons.findIndex(pokemon => pokemon.name === currentPokemonName)

export const setAllPokemons = async () => {
  if (!pokemons || pokemons.length === 0) pokemons = await fetchAllPokemons()
}

export const getPreviousPokemon = () => {
  const pokemonIndex = getCurrentPokemonIndex()
  return pokemons[pokemonIndex - 1] || pokemons[0]
}

export const getNextPokemon = () => {
  const pokemonIndex = getCurrentPokemonIndex()
  return pokemons[pokemonIndex + 1] || pokemons[pokemons.length - 1]
}
