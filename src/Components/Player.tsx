import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from '@expo/vector-icons';

interface IPlayer {
    audio: string,
    color: string[],
    skipTrackHandler: (direction: string) => Promise<void>
}

const Player = (props: IPlayer) => {
    const [play, setPlay] = useState(false);

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
                    <MaterialIcons
                        style={styles.button}
                        name="skip-previous"
                        size={24} color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons
                        style={styles.button}
                        name={play ? "pause" : 'play-arrow'}
                        size={24} color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.skipTrackHandler("skip-forward")}>
                    <MaterialIcons
                        style={styles.button}
                        name="skip-next"
                        size={24} color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      // padding: 30,
      // borderRadius: 50,
      // color: 'rgba(201, 215, 230, 0.8)'
    },
    controls: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 70
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
    }
})

export default Player;