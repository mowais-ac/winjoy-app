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
import Cart from '../screens/Cart';
import ProductDetail from '../screens/ProductDetail';
import LeaderBoard from '../screens/LeaderBoard';
import Noon from '../screens/Noon';
import Orders from '../screens/MyOrders/Orders.js';
import Quiz from '../screens/Quiz';
import LiveProducts from '../screens/LiveProducts.js';
import GoldenTulip from '../screens/Fanjoy/GoldenTulip';
import Fanjoy from '../screens/Fanjoy/Fanjoy';
import Prizes from '../screens/Fanjoy/Prizes';
//import Webrtc from '../screens/Webtrc';
const Stack = createNativeStackNavigator();
export default index = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="TriviaJoy" component={TriviaJoy} />
    <Stack.Screen name="DealsJoy" component={DealsJoy} />
    <Stack.Screen name="CreatorsPage" component={CreatorsPage} />
    <Stack.Screen name="AllCreatorsPage" component={AllCreatorsPage} />
    <Stack.Screen name="CreatorsGallery" component={CreatorsGallery} />
    <Stack.Screen name="Noon" component={Noon} />
    <Stack.Screen
      name="ExperienceProductDetail"
      component={ExperienceProductDetail}
    />
    <Stack.Screen name="Cart" component={Cart} />
    {/*  <Stack.Screen name="Webrtc" component={Webrtc} /> */}
    <Stack.Screen name="Orders" component={Orders} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
    <Stack.Screen name="AllCreatorsList" component={AllCreatorsList} />
    <Stack.Screen name="Fanjoy" component={Fanjoy} />
    <Stack.Screen name="Prizes" component={Prizes} />
    <Stack.Screen name="GoldenTulip" component={GoldenTulip} />
    <Stack.Screen
      name="SimpleProductDetailInExperience"
      component={SimpleProductDetailInExperience}
    />
    <Stack.Screen name="CreatorExperience" component={CreatorExperience} />
  </Stack.Navigator>
);
