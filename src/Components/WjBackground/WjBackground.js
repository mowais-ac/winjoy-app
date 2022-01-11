import React from 'react';
import { View, Text } from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";
function WjBackground({ style }) {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={["#420E92", "#E7003F"]}
            style={[styles.mainView, style]}
        >
        </LinearGradient>
    )
}
export { WjBackground };