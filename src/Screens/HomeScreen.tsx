import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const HomeScreen = () => {
    return (
        <LinearGradient
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{x: 1, y: 1}}
            colors={[
                'rgba(195, 209, 228, 0.2)',
                'rgba(221, 231, 243, 0.55)',
                'rgba(212, 224, 237, 1)'
            ]}
        >
            <View>
                <Text>
                    Home
                </Text>
            </View>
        </LinearGradient>)
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    }
})

export default HomeScreen;