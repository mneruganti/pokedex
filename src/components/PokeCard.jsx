import { useEffect } from 'react'

export function PokeCard(props) {
    const { selectedPokemon } = props

    // selectedPokemon will hold the pokemon that users will select.
    // Putting it in the dependency array for the useEffect() function
    // lets the function know that the item passed in the array will
    // constantly be changing, hence allowing us to dynamically fetch the data

    useEffect(()=>{
        // First: Loading state
            //if loading, exit logic
        // Second: Is it necessary to fetch new information, or have
        // you already fetched the information before and can access it from the cache
            // check if the selected pokemon informaion is in the cache
        //
    }, [selectedPokemon])
    return (
        <div>

        </div>
    )
}