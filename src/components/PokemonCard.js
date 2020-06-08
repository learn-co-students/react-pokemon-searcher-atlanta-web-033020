import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = (props) => {
    let pokemon = props.pokemon

    return (
      <Card
        onClick={() => props.flipPoke(pokemon.id)}
      >
        <div>
          <div className="image">
            <img src={!props.flippedPokemonIds.includes(pokemon.id) ? pokemon.sprites.front : pokemon.sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {pokemon.stats.find(stat => stat.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }

export default PokemonCard
