import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

const PokemonCollection = props => {
  const renderPokemonCards = () => {
    return props.pokemon.map(pokemon => {
      return (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          frontSprite={pokemon.sprites.front}
          backSprite={pokemon.sprites.back}
          hp={pokemon.stats[5].value}
        />
      )
    })
  };

  return (
    <Card.Group itemsPerRow={6}>
      {renderPokemonCards()}
    </Card.Group>
  )
}

export default PokemonCollection
