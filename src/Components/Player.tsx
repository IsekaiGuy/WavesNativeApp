import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from './Icon';
import {Shadow} from 'react-native-shadow-2';
import songs, {ISong} from '../data';
import TrackPlayer, {
  RepeatMode,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

interface IPlayer {
  currentSong: ISong;
  skipTrackHandler: (direction: string) => Promise<void>;
  setCurrentSong: (track: any) => void;
}

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add(songs);
};

const togglePlayback = async (playbackState: any) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const Player = (props: IPlayer) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    const track = TrackPlayer.getCurrentTrack();
    if (+props.currentSong.id !== +track) {
      TrackPlayer.skip(+props.currentSong.id);
    }
  }, [props.currentSong.id]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      await props.setCurrentSong(track);
    }
  });

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    button: {
      padding: 30,
      borderRadius: 50,
      color: `${props.currentSong.color[0]}`,
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

  useEffect(() => {
    setupPlayer();
    TrackPlayer.setRepeatMode(RepeatMode.Off);
  }, []);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.progressBar}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={props.currentSong.color[0]}
        minimumTrackTintColor={props.currentSong.color[0]}
        maximumTrackTintColor={props.currentSong.color[1]}
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />

      <View style={styles.durationData}>
        <Text>
          {new Date(progress.position * 1000).toISOString().slice(14, 19)}
        </Text>
        <Text>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .slice(14, 19)}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={async () => {
            await props.skipTrackHandler('skip-back');
            await TrackPlayer.skipToPrevious();
          }}>
          <Shadow
            distance={5}
            startColor={props.currentSong.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.buttonWrapper}>
              <Icon
                fill={props.currentSong.color[0]}
                name="Previous"
                style={styles.button}
                viewBox="-10 -10 70 70"
              />
            </View>
          </Shadow>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
          <Shadow
            distance={5}
            startColor={props.currentSong.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.playButtonWrapper}>
              <Icon
                fill={props.currentSong.color[0]}
                name={playbackState === State.Playing ? 'Pause' : 'Play'}
                style={styles.button}
                viewBox="4 4 40 40"
              />
            </View>
          </Shadow>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await props.skipTrackHandler('skip-forward');
            await TrackPlayer.skipToNext();
          }}>
          <Shadow
            distance={5}
            startColor={props.currentSong.color[0]}
            radius={50}
            containerViewStyle={{opacity: 0.7}}>
            <View style={styles.buttonWrapper}>
              <Icon
                fill={props.currentSong.color[0]}
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
