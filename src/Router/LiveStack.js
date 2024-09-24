import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LiveProducts from '../screens/LiveProducts.js';
import Webmodallive from '../screens/Webmodallive/Webmodallive.js';
import Landing from '../screens/Landing';
const Stack = createStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen
      name="LiveProducts"
      component={LiveProducts}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="Webmodallive" component={Webmodallive} />

    <Stack.Screen name="Landing" component={Landing} />
  </Stack.Navigator>
);
