import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { pokeAPI } from "../../services/pokeAPI";
import { PokemonShortInfo } from "../../types/Pokemon";
import { Pokemon } from "./components/Pokemon";

export const Pokemons: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonShortInfo[]>();
    const [search, setSearch] = useState('');
    const [pokemonsDataSource, setPokemonsDataSource] = useState<PokemonShortInfo[]>();

    const getPokemons = async () => {
        try {  
            const pokemons = await pokeAPI.getPokemons();
            setPokemons(pokemons);
            setPokemonsDataSource(pokemons)

        } catch (error) {
            console.error(error);
        }
    };
    
    const searchFilterPokemons = (text: string) => {
        if (text) {
            const newData = pokemonsDataSource?.filter(
                function (item) {
                    const itemData = item.name
                    const textData = text.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                })
            setPokemons(newData);
            setSearch(text);
        } else {
            getPokemons();
            setSearch(text);
        }
    }

    useEffect(() => {
        getPokemons()
    }, [])

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Pokeapp</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => searchFilterPokemons(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList 
        data={pokemons} 
        //Здесь немного переделал кастыль для нормального вывода картинок)))
        renderItem={({item}) => 
            <Pokemon data={item} index={item.url.split("/")[6]} />}
        style={styles.list}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
    },
    title: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
    },
    list: {
        padding: 16,
        marginTop: 16,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: 'grey',
        backgroundColor: '#FFFFFF',
      },
});

