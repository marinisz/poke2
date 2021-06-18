import React, {useState,useEffect} from 'react';
import PokemonThumbnail from'./Components/PokemonThumbnail'

function App() {
  const[allPokemons ,setAllPokemons]=useState([]);
  const [loadMore,setLoadMore]=useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async() =>{
    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)

    function createpokemonObject(result){
      result.forEach(async(pokemon)=>{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()

        setAllPokemons(currentList=>[...currentList, data])
      })
    }
    createpokemonObject(data.results)
  }


  useEffect(()=>{
    getAllPokemons()
  },[])


  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon,index)=>
            <PokemonThumbnail
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />
            )}
        </div>
        <button className="load-more" onClick={()=>getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;
