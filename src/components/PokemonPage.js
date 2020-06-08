import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'
import FuzzySearch from 'fuzzy-search';

const BASE_URL = 'http://localhost:3000/pokemon';

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchedPokemon: []
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(pokemon => this.setState({ pokemon: pokemon, searchedPokemon: pokemon }))
  }

  searchPokemon = query => {
    const searchOptions = ['name'];
    const searcher = new FuzzySearch(this.state.pokemon, searchOptions);

    this.setState({ searchedPokemon: searcher.search(query) });
  }

  createPokemon = e => {
    e.preventDefault();

    const pokemonObj = this.createPokemonObject(
      e.target.name.value,
      e.target.hp.value,
      e.target.frontUrl.value,
      e.target.backUrl.value
    );

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemonObj)
    }

    fetch(BASE_URL, fetchObj)
      .then(response => response.json())
      .then(pokemon => this.setState({ pokemon: [...this.state.pokemon, pokemon] }))
  }

  createPokemonObject = (name, hp, frontUrl, backUrl) => {
    return {
      name: name,
      stats: [{}, {}, {}, {}, {}, {
        value: hp,
        name: 'hp'
      }],
      sprites: {
        front: frontUrl,
        back: backUrl
      }
    }
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search searchPokemon={this.searchPokemon} />
        <br />
        <PokemonCollection pokemon={this.state.searchedPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
