import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    flippedPokemonIds: [],
    searchedName: '',
    sortMethod: ''
  }

  sortPoke = (pokemon) => {
    let pokeAry = [...pokemon]
    if (this.state.sortMethod === 'Alphabetical') {
      pokeAry = pokeAry.sort((pokeA, pokeB) => pokeA.name.localeCompare(pokeB.name))
    }
    return pokeAry
  }

  flipPoke = (id) => {
    let flippedId = [...this.state.flippedPokemonIds]  
    if (flippedId.includes(id)) {
      flippedId = flippedId.filter(flipped => flipped !== id)
    } else {
      flippedId.push(id)
    }
    this.setState({flippedPokemonIds: flippedId})
  }

  searchPokemon = () => {
    if (this.state.searchedName === '') {
      return this.state.pokemon
    }
    let filteredPokemon = [...this.state.pokemon]
    filteredPokemon = filteredPokemon.filter(pokemon => pokemon.name.includes(this.state.searchedName, 0))
    return this.sortPoke(filteredPokemon)
  }

  setSearchedName = (name) => {
    this.setState({searchedName: name})
  }

  setSort = (criteria) => {
    this.setState({sortMethod: criteria})
  }

  addPokemon = (pokemon) => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: pokemon.name,
        stats: [{
          name: 'hp',
          value: pokemon.hp
        }],
        sprites: {
          front: pokemon.front,
          back: pokemon.back
        }
      })
    })
    .then(res => res.json())
    .then(pokemon => this.setState({pokemon: [pokemon, ...this.state.pokemon]}))
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokemon => this.setState({pokemon: pokemon}))
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search setSearchedName={this.setSearchedName} />
        <br />
        <PokemonCollection 
          flippedPokemonIds={this.state.flippedPokemonIds}
          pokemon={this.searchPokemon()} 
          flipPoke={this.flipPoke} 
        />
      </Container>
    )
  }
}

export default PokemonPage
