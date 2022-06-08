import React, {useCallback, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import songs from '../data';
import {ISong} from "../data";
import Player from "../Components/Player";

const HomeScreen = (props: any) => {
    const [currentSong, setCurrentSong] = useState<ISong>(songs[0]);

    const skipTrackHandler = useCallback(
        async (direction) => {
            let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

            if (direction === "skip-forward") {
                await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            }

            if (direction === "skip-back") {
                if (currentIndex === 0) {
                    await setCurrentSong(songs[songs.length - 1]);
                } else {
                    await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
                }
            }
        },
        [currentSong.id, setCurrentSong, songs]
    );

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 100,
        },
        name: {
            textAlign: 'center',
            marginTop: 30,
            color: `${currentSong.color[0]}`,
            shadowOffset: {width: 2, height: 2},
            shadowRadius: 1,
            shadowColor: 'whitesmoke',
            fontSize: 30,
            fontWeight: 'bold'
        },
        artist: {
            fontWeight: '400',
            color: 'rgb(99, 99, 99)',
            fontSize: 16,
            textAlign: 'center'
        }
    })

    useEffect(() => {
        if(!props.route.params) return;
        const song = songs.find((track:ISong) => track.id === props.route.params.id);
        setCurrentSong(song ? song : songs[0]);
    }, [props])

    return (
        <LinearGradient
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{x: 1, y: 1}}
            colors={[
                'rgba(221, 231, 243, 1)',
                'rgba(212, 224, 237, 1)'
            ]}
        >
            <View>
               <View style={styles.imageContainer}>
               <Image
                   style={styles.image}
                   source={{uri: `${currentSong.cover}`}}
               />
               </View>
                <Text style={styles.name}>
                    {currentSong.name}
                </Text>
                <Text style={styles.artist}>
                    {currentSong.artist}
                </Text>
            </View>
            <Player
                audio={currentSong.audio}
                color={currentSong.color}
                skipTrackHandler={skipTrackHandler}
            />
        </LinearGradient>)
}

export default HomeScreen;