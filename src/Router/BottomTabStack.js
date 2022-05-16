import React from 'react';
import {Dimensions, StatusBar, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProductStack from './ProductStack';
import {Colors} from '../Constants/Index';
import TabButton from '../Components/TabButton';
import Winners from '../screens/Winners/index';
import Profile from '../screens/Profile';
import ProfileStack from './ProfileStack';
import Wallet from '../screens/Wallet';
import WinnerStack from './WinnerStack';
import I18n from 'react-native-i18n';
// I18n.locale = "ar";
import {strings} from '../i18n';
import Cart from '../screens/Cart';
const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function index() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.REDESH,
        tabBarInactiveTintColor: Colors.BLACK,
        // tabBarStyle: {
        //   position: 'absolute',
        //   borderTopColor: 'rgba(0, 0, 0, .2)',
        // },
        labelStyle: {fontFamily: 'ProximaNova Regular'},
        tabStyle: {borderLeftColor: Colors.LIGHT_MUTED, borderLeftWidth: 3},
        style: {height: height * 0.08},
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name={strings('bottom_tabs.home')}
        component={HomeStack}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({color, size}) => <TabButton name={'HOME'} />,
        }}
      />
      <Tab.Screen
        name={strings('bottom_tabs.products')}
        component={ProductStack}
        options={{
          tabBarLabel: 'PRODUCTS',
          tabBarIcon: ({color, size}) => <TabButton name={'PRODUCTS'} />,
        }}
      />
      <Tab.Screen
        name={strings('bottom_tabs.winners')}
        component={WinnerStack}
        options={{
          tabBarLabel: 'WINNERS',
          tabBarIcon: ({color, size}) => <TabButton name={'WINNERS'} />,
        }}
      />
      <Tab.Screen
        name={strings('bottom_tabs.wallet')}
        component={Wallet}
        options={{
          tabBarLabel: 'WALLET',
          tabBarIcon: ({color, size}) => <TabButton name={'WALLET'} />,
        }}
      />
      <Tab.Screen
        name={'PROFILE'}
        component={ProfileStack}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({color, size}) => <TabButton name={'PROFILE'} />,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconView: {
    borderRadius: 30,
    width: width * 0.1,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
