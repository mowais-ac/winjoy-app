import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from "../screens/Landing";
import FanJoy from "../screens/FanJoy";
const Stack = createNativeStackNavigator();
export default index = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="FanJoy" component={FanJoy} />
    </Stack.Navigator>
);