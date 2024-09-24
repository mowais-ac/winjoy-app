import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from '../screens/Quiz';
import TriviaJoy from '../../src/screens/TriviaJoy';
import Landing from '../../src/screens/Landing';
const Stack = createStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="TriviaJoy" component={TriviaJoy} />
  </Stack.Navigator>
);
