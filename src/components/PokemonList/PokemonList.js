import React, { useEffect, useState }  from "react";
import axios from "axios";

function PokemonList({ searchTerm = "" }) {

  const [list, setList] = useState([]);
  const [listFiltered, setListFiltered]= useState([]);
  console.log("list",list);

 async function getDatas() {
    const listPokemons = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")).data.results;

    console.log("resultats : ",listPokemons);
    setList(listPokemons);

  }

  useEffect(() => {
    getDatas();
  },[])

  useEffect(() => {
   const newList = list.filter((pokemon) => {
      return pokemon.name.includes(searchTerm);
    })
    setListFiltered(newList)

    console.log("filtered",listFiltered);
  },[searchTerm])
 

  const listDisplayed = listFiltered?.length >0 ? listFiltered : list;

  return (
    <ul>
   {
    listDisplayed.map( (pokemon, index) => {
      return <li key={index}>{pokemon.name}</li>
    })
   }
    </ul>
  );
}

export default PokemonList;
