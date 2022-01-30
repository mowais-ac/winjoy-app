import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HamburgerMenu from "../screens/HamburgerMenu";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import BuyLife from "../screens/BuyLife";
import Orders from "../screens/MyOrders/Orders";
const Stack = createNativeStackNavigator();
export default index = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="HamburgerMenu" component={HamburgerMenu} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="BuyLife" component={BuyLife} />
        <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
);