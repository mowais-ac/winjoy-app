import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/Landing';
import TriviaJoy from '../screens/TriviaJoy';
import DealsJoy from '../screens/DealsJoy';
import CreatorsPage from '../screens/CreatorsPage';
import AllCreatorsPage from '../screens/AllCreatorsPage';
import CreatorsGallery from '../screens/CreatorsGallery';
import ExperienceProductDetail from '../screens/ExperienceProductDetail';
import AllCreatorsList from '../screens/AllCreatorsList';
import SimpleProductDetailInExperience from '../screens/SimpleProductDetailInExperience';
import CreatorExperience from '../screens/CreatorExperience';
/* import PrizeList from '../screens/PrizeList';
import ProductDetail from '../screens/ProductDetail'; */
const Stack = createNativeStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="TriviaJoy" component={TriviaJoy} />
    <Stack.Screen name="DealsJoy" component={DealsJoy} />
    <Stack.Screen name="CreatorsPage" component={CreatorsPage} />
    <Stack.Screen name="AllCreatorsPage" component={AllCreatorsPage} />
    <Stack.Screen name="CreatorsGallery" component={CreatorsGallery} />
    <Stack.Screen
      name="ExperienceProductDetail"
      component={ExperienceProductDetail}
    />
    {/* <Stack.Screen name="PrizeList" component={PrizeList} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} /> */}
    <Stack.Screen name="AllCreatorsList" component={AllCreatorsList} />
    <Stack.Screen
      name="SimpleProductDetailInExperience"
      component={SimpleProductDetailInExperience}
    />
    <Stack.Screen name="CreatorExperience" component={CreatorExperience} />
  </Stack.Navigator>
);
