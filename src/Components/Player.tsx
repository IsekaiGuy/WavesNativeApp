import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';
import {opacity} from "react-native-reanimated/lib/types/lib/reanimated2";

interface IPlayer {
    audio: string,
    color: string[],
    skipTrackHandler: (direction: string) => Promise<void>
}

const Player = (props: IPlayer) => {
    const [play, setPlay] = useState(false);

    const styles = StyleSheet.create({
        button: {
            padding: 15,
            borderRadius: 50,
            color: `${props.color[0]}`,
            shadowColor: 'grey',
            shadowRadius: 1,
            shadowOffset: {width: 10, height: 1},
        },
        controls: {
            alignItems: 'center',
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 50
        },
        durationData: {
            flexDirection: 'row',
            justifyContent: "space-between",
            paddingHorizontal: 15
        },
        progressBar: {
            width: 340,
            height: 32,
            flexDirection: 'row',
            marginTop: 50,
        },
    })

    return (
        <View>
            <Slider
                style={styles.progressBar}
                value={10}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor={props.color[0]}
                minimumTrackTintColor={props.color[0]}
                maximumTrackTintColor={props.color[1]}
                onSlidingComplete={() => {}}
            />

            <View style={styles.durationData}>
                <Text>
                    0:00
                </Text>
                <Text>
                    3:55
                </Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={() => props.skipTrackHandler("skip-back")}>
                    <Shadow
                        distance={3}
                        startColor={props.color[0]}
                        radius={50}
                        containerViewStyle={{opacity: 0.7}}
                    >
                        <MaterialIcons
                            style={styles.button}
                            name="skip-previous"
                            size={24} color="black"
                        />
                    </Shadow>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Shadow
                        distance={3}
                        startColor={props.color[0]}
                        radius={50}
                        containerViewStyle={{opacity: 0.7}}
                    >
                        <MaterialIcons
                            style={styles.button}
                            name={play ? "pause" : 'play-arrow'}
                            size={36}
                            color="black"
                        />
                    </Shadow>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.skipTrackHandler("skip-forward")}>
                    <Shadow
                        distance={3}
                        startColor={props.color[0]}
                        radius={50}
                        containerViewStyle={{opacity: 0.7}}
                    >
                        <MaterialIcons
                            style={styles.button}
                            name="skip-next"
                            size={24} color="black"
                        />
                    </Shadow>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Player;