import React from 'react';
import { Dimensions, StatusBar, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from "./HomeStack";
import ProductStack from "./ProductStack";
import { Colors } from "../Constants/Index";
import TabButton from "../Components/TabButton";
import Winners from '../screens/Winners/Winners';
import Draws from '../screens/Draws/Draws';
import Wallet from '../screens/Wallet';

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

export default function index() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.REDESH,
        inactiveTintColor: Colors.BLACK,
        labelStyle: { fontFamily: "ProximaNova Regular" },
        tabStyle: { borderLeftColor: Colors.LIGHT_MUTED, borderLeftWidth: 3 },
        style: { height: height * 0.08 },
        keyboardHidesTabBar: true,
      }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <View style={[styles.iconView, { backgroundColor: focused ? '#F4EDEF' : null }]}>
              <TabButton name={route.name} />
            </View>
          );
        },
        headerShown:false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="PRODUCTS" component={ProductStack} />


      <Tab.Screen
      name="WINNERS"
      component={Winners}
    />
    
    <Tab.Screen name="DRAWS" component={Draws} />
    <Tab.Screen name="WALLET" component={Wallet} /> 
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconView: { borderRadius: 30, width: width * 0.1, height: height * 0.05, justifyContent: 'center', alignItems: 'center' }


});