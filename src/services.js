const API_BASE_URL = 'https://pokeapi.co/api/v2'
const API_POKEMON = `${API_BASE_URL}/pokemon`

const fetcher = async url => {
  const response = await fetch(url)
  return await response.json()
}

export const fetchPokemon = async name => {
  try {
    return await fetcher(`${API_POKEMON}/${name}`)
  } catch (error) {
    return null
  }
}
export const fetchAllPokemons = async () => {
  try {
    const response = await fetcher(`${API_POKEMON}?limit=10000`)
    return response.results
  } catch (error) {
    return []
  }
}
