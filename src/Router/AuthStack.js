import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import Verify from '../screens/Verify';
import BottomTabStack from './BottomTabStack';

import Cart from '../screens/Cart';
import MenuStack from '../Router/MenuStack';
import GameStack from './GameStack';
import WebView from '../screens/WebView';
const Stack = createNativeStackNavigator();
export default AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Verify" component={Verify} />
    <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
    <Stack.Screen name="MenuStack" component={MenuStack} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="GameStack" component={GameStack} />
    <Stack.Screen name="WebView" component={WebView} />
  </Stack.Navigator>
);
