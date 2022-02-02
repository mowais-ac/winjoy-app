import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {View, Text,Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import PreviousDraws from '../Screens/PreviousDraws';
import UpComming from '../Screens/UpComming';
const { width, height } = Dimensions.get("window");
const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <View
      style={{
        width:width*0.99,
        flex: 1,
        paddingTop: 10,
        
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 30,
                width:152,
                paddingLeft:24,
                
              }}>
            
              <Text
                style={{ 
                  fontFamily: 'Europa-Bold',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  alignItems: 'center',
                  letterSpacing: 0,
                  color: focused ? '#E7003F' : '#ffffff',
                  textTransform: 'uppercase',
                  marginBottom:height*0.02}}>
                {route.name}
              </Text>
            </View>
          ),
        })}
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: true,
          //labelPosition: 'labelPosition',
        //  showIcon: true,
          labelStyle: {
            fontFamily: 'Europa-Bold',
            fontSize: 14,
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            textTransform: 'capitalize',
       
          },
         
          tabStyle: {
            width: width*0.45,
            height:height*0.06,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0,0,0,0)'
          },
          style: {
            width: width*0.9,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor:'#ffffff',
            alignSelf: 'center',
            borderRadius: 26.5,
            backgroundColor: 'rgba(0,0,0,0)',
            justifyContent: 'center',
        
            
          },
          indicatorStyle: {
            width: width*0.45,
            height: height*0.06,
            borderRadius: 26.5,
            backgroundColor: '#ffffff',
            shadowColor: 'rgba(91, 102, 121, 0.15)',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowRadius: 18,
            shadowOpacity: 1,
           
          },
        }}>
          <Tab.Screen name="Previous Draws" component={PreviousDraws} />
        <Tab.Screen name="Up Comming" component={UpComming} />
        
      </Tab.Navigator>
    </View>
  );
}

export default Tabs;
