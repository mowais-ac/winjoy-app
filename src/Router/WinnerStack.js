import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PrizeList from '../screens/PrizeList';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import Winners from '../screens/Winners/index';
const Stack = createStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Winners" component={Winners} />
    <Stack.Screen name="Cart" component={Cart} />
  </Stack.Navigator>
);
