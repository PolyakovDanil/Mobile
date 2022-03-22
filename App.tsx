import React from 'react';
import { View } from 'react-native';
import { Pokemons } from './containers/Pokemons';
import { pokeAPI } from './services/pokeAPI';

export default function App() {
  pokeAPI.getPokemons();

  return (
    <View>
      <Pokemons />
    </View>
  );
}

