import { useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils'
import TypeCard from './TypeCard'

export default function PokeCard(props) {
    const { selectedPokemon } = props
    const [ data, setData ] = useState(null)
    const [loading, setLoading] = useState(false)

    const { name, height, abilities, stats, types, moves, sprites } = data || {}

    // selectedPokemon will hold the pokemon that users will select.
    // Putting it in the dependency array for the useEffect() function
    // lets the function know that the item passed in the array will
    // constantly be changing, hence allowing us to dynamically fetch the data

    useEffect(()=>{
        // First: Loading state
            //if loading, exit logic
        
        if (loading || !localStorage) { return }

        // Second: Is it necessary to fetch new information, or have
        // you already fetched the information before and can access it from the cache
            // 1. Define the cache
        
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }
        
            // 2. Check if the selected pokemon informaion is in the cache, otherwise fetch
            // 3. If we fetch from the API, save it to the cache for next time

        if (selectedPokemon in cache) {
            // read from cache
            setData(cache[selectedPokemon])
            return
        }
        
        // function to fetch the data from the API
        async function fetchPokemonData() {
            setLoading(true)

            try {

               
                const baseURL = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon) 
                const finalURL = baseURL + suffix
                const res = await fetch(finalURL)
                const pokemonData = await res.json()
                setData(pokemonData)

                // update the cache
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))

            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        
        // invoke the process
        fetchPokemonData()

        
    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }
    return (
        <div className='poke-card'>
            <div>
                <h4>
                    #{getFullPokedexNumber(selectedPokemon)}
                </h4>
                <h2>{name}</h2>
            </div>
            <div className='type-container'>
                {types.map((type, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={type} />
                    )
                })}
            </div>
        </div>
    )
}