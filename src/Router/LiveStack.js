import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LiveProducts from '../screens/LiveProducts.js';
import Webmodallive from '../screens/Webmodallive/Webmodallive.js';
import Landing from '../screens/Landing';
const Stack = createNativeStackNavigator();
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
