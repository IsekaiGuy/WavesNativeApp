import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/Screens/HomeScreen";
import LibraryScreen from "./src/Screens/LibraryScreen";
import { MaterialIcons } from '@expo/vector-icons';
import {StyleSheet} from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (<NavigationContainer>
          <Drawer.Navigator
              drawerContent={(props) => <LibraryScreen {...props}/>}
              initialRouteName="Home"
              screenOptions={({ navigation }) => ({
                  headerLeft: () =>
                      <MaterialIcons
                          name="library-music"
                          size={26}
                          color='whitesmoke'
                          style={styles.icon}
                          onPress={navigation.toggleDrawer}
                      />,
                  headerTitleAlign: 'center',
                  headerStyle: {
                      ...styles.background
                  },
                  headerTitleStyle: {
                      ...styles.headerTitle
                  },
              })}
          >
              <Drawer.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Waves' }}
              />
          </Drawer.Navigator>
        </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 26,
        color: 'whitesmoke',
        textShadowColor: 'rgb(99, 99, 99)',
        textShadowOffset: {width: 1, height: 1},
        fontWeight: '700',
        textShadowRadius: 3
    },
    icon: {
        marginLeft: 20,
        textShadowColor: 'grey',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    background: {
        backgroundColor: 'rgba(212, 224, 237, 1)'
    },
})