import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

const PokemonCollection = (props) => {
  const mapPokemon = () => {
    return props.pokemon.map((pokemon) => {
      return (
        <PokemonCard 
          flippedPokemonIds={props.flippedPokemonIds}
          pokemon={pokemon}
          flipPoke={props.flipPoke} 
          key={pokemon.id}
        />
      )
    })
  }

  return (
    <Card.Group itemsPerRow={6}>
      <h1>Hello From Pokemon Collection</h1>
      {mapPokemon()}
    </Card.Group>
  )
}

export default PokemonCollection
