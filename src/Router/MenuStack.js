import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HamburgerMenu from "../screens/HamburgerMenu";
import Friends from "../screens/Friends";
import BuyLife from "../screens/BuyLife";
const Stack = createNativeStackNavigator();
export default index = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="HamburgerMenu" component={HamburgerMenu} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="BuyLife" component={BuyLife} />
    </Stack.Navigator>
);