import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/Screens/HomeScreen';
import LibraryScreen from './src/Screens/LibraryScreen';
import {StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from './src/Components/Icon';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props: any) => <LibraryScreen {...props} />}
        initialRouteName="Home"
        screenOptions={({navigation}: any) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Icon
                name="Library"
                fill="#2d82b5"
                viewBox="0 -10 60 60"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            ...styles.background,
          },
          headerTitleStyle: {
            ...styles.headerTitle,
          },
        })}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Waves'}}
        />
      </Drawer.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 26,
    color: 'whitesmoke',
    textShadowColor: 'rgb(99, 99, 99)',
    textShadowOffset: {width: 1, height: 1},
    fontWeight: '700',
    textShadowRadius: 3,
  },
  icon: {
    marginLeft: 20,
  },
  background: {
    backgroundColor: 'rgba(212, 224, 237, 1)',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
