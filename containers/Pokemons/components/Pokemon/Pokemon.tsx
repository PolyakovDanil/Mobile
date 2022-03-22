import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { imageService } from "../../../../services/imageService";
import { PokemonShortInfo } from "../../../../types/Pokemon";

interface PokemonProps {
    data: PokemonShortInfo;
    index: string;
}

export const Pokemon: React.FC<PokemonProps> = ({data, index}) => {
    return (
    <View style={styles.container}>
        <Text style={styles.name}>{data.name}</Text>
        <Image style={styles.image} source={{uri: imageService.getImageByIndex(index) }}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        backgroundColor: "lightgrey",
        marginBottom: 16,
        borderRadius: 8,
        padding: 16,
    },
    name: {
        textAlign: 'center',
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})