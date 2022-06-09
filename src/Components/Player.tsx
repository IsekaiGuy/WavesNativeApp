import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from './Icon';
import {Shadow} from 'react-native-shadow-2';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

interface IPlayer {
  audio: string;
  color: string[];
  skipTrackHandler: (direction: string) => Promise<void>;
}

const Player = (props: IPlayer) => {
  console.log(TrackPlayer);

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    button: {
      padding: 30,
      borderRadius: 50,
      color: `${props.color[0]}`,
      shadowColor: 'grey',
      shadowRadius: 1,
      shadowOffset: {width: 10, height: 1},
    },
    playButtonWrapper: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonWrapper: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    controls: {
      alignItems: 'center',
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
    },
    durationData: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    progressBar: {
      width: 340,
      height: 32,
      flexDirection: 'row',
      marginTop: 50,
    },
  });

  return (
    <View style={styles.container}>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        thumbTintColor={props.color[0]}
        minimumTrackTintColor={props.color[0]}
        maximumTrackTintColor={props.color[1]}
        onSlidingComplete={() => {}}
      />

      <View style={styles.durationData}>
        <Text>0:00</Text>
        <Text>3:55</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => props.skipTrackHandler('skip-back')}>
          <Shadow
            distance={5}
            startColor={props.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.buttonWrapper}>
              <Icon
                fill={props.color[0]}
                name="Previous"
                style={styles.button}
                viewBox="-10 -10 70 70"
              />
            </View>
          </Shadow>
        </TouchableOpacity>
        <TouchableOpacity>
          <Shadow
            distance={5}
            startColor={props.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.playButtonWrapper}>
              <Icon
                fill={props.color[0]}
                name="Play"
                style={styles.button}
                viewBox="4 4 40 40"
              />
            </View>
          </Shadow>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.skipTrackHandler('skip-forward')}>
          <Shadow
            distance={5}
            startColor={props.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.buttonWrapper}>
              <Icon
                fill={props.color[0]}
                name="Next"
                style={styles.button}
                viewBox="-10 -10 70 70"
              />
            </View>
          </Shadow>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;
