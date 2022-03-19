import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrizeList from '../screens/PrizeList';
import ProductDetail from '../screens/ProductDetail';
const Stack = createNativeStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="PrizeList" component={PrizeList} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
  </Stack.Navigator>
);
