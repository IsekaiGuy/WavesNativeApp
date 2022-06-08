import React from "react";
import {View, Text, StyleSheet, FlatList, Image} from "react-native";
import songs from "../data";
import {DrawerItem} from "@react-navigation/drawer";

const LibraryScreen = ({navigation}:any) => {
    return (<View style={styles.screen}>
        <DrawerItem
            labelStyle={styles.title}
            label='Library'
            onPress={() => null}
        />
        <FlatList
            keyExtractor={(song) => song.id}
            showsVerticalScrollIndicator={false}
            data={songs}
            renderItem={({item}) => {
                return ( <DrawerItem
                    label={() => (
                        <View style={styles.container}>
                            <Text style={styles.song}>
                                {item.name}
                            </Text>
                            <Text>
                                {item.artist}
                            </Text>
                        </View>
                    )}
                    icon={() => (
                        <Image
                            style={styles.image}
                            source={{uri: `${item.cover}`}}
                            resizeMode="contain"
                        />
                    )}
                    onPress={() => navigation.navigate('Home', {id: item.id})}
                />)
            }}
        />
    </View>)
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'rgba(221, 231, 243, 1)',
    },
    container: {
        marginVertical: 20
    },
    song: {
        fontWeight: 'bold',
        fontSize: 16
    },
    title: {
        color: '#2ab3bf',
        fontSize: 34,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: '700',
        textShadowColor: 'whitesmoke',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
    }
})

export default LibraryScreen;