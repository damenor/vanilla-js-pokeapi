import '@/styles/globals.css'

import { fetchPokemon } from '@/services'
import { getNextPokemon, getPreviousPokemon, setAllPokemons, setCurrentPokemon } from '@/store'

const searchButton = document.querySelector('.pokemon-search__btn')
const searchInput = document.querySelector('.pokemon-search__input')

const pokemonError = document.querySelector('.pokemon-error')
const pokemonSpinner = document.querySelector('.pokemon-spinner')
const pokemonContainer = document.querySelector('.pokemon')
const pokemonPrevious = document.querySelector('.pokemon__previous')
const pokemonNext = document.querySelector('.pokemon__next')
const pokemonName = document.querySelector('.pokemon__name')
const pokemonImg = document.querySelector('.pokemon__img')

const displayPokemon = pokemon => {
  setCurrentPokemon(pokemon)
  pokemonName.textContent = pokemon.name
  pokemonImg.setAttribute('src', pokemon.sprites.other['official-artwork'].front_default)
}

const fetchAndDisplayPokemon = async name => {
  pokemonSpinner.classList.add('visible')
  pokemonError.classList.remove('visible')
  pokemonContainer.classList.remove('visible')
  const pokemon = await fetchPokemon(name)
  pokemonSpinner.classList.remove('visible')
  if(!pokemon) return pokemonError.classList.add('visible')
  setAllPokemons()
  displayPokemon(pokemon)
  pokemonContainer.classList.add('visible')
}

const handleOnPreviousPokemon = async () => {
  const previousPokemon = getPreviousPokemon()
  await fetchAndDisplayPokemon(previousPokemon.name)
}

const handleOnNextPokemon = async () => {
  const nextPokemon = getNextPokemon()
  await fetchAndDisplayPokemon(nextPokemon.name)
}

const handleOnSearchPokemon = async () => {
  const pokemonToSearch = searchInput.value
  searchInput.value = ''
  await fetchAndDisplayPokemon(pokemonToSearch)
}

searchButton.addEventListener('click', handleOnSearchPokemon)
pokemonPrevious.addEventListener('click', handleOnPreviousPokemon)
pokemonNext.addEventListener('click', handleOnNextPokemon)
