import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PrizeList from '../screens/PrizeList';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
const Stack = createStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Cart" component={Cart} />
  </Stack.Navigator>
);
