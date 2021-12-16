import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Quiz from "../screens/Quiz";
const Stack = createNativeStackNavigator();
export default index = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Quiz" component={Quiz} />

    </Stack.Navigator>
);