import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import Register from "../screens/Register";
import Verify from "../screens/Verify";
const Stack = createNativeStackNavigator();
export default AuthStack = () => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}
        initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        
    </Stack.Navigator>
);