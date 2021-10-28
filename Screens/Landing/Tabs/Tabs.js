import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {View, Text} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import LiveGameShows from '../Screens/LiveGameShows';
import LuckyDraws from '../Screens/LuckyDraws';

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <View
      style={{
        width:'100%',
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
                
                paddingLeft: 20,
                
              }}>
            
              <Text
                style={{
                  
                  fontFamily: 'Europa-Bold',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: focused ? '#E7003F' : '#ffffff',
                  textTransform: 'uppercase',
                  
                }}>
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
            width: 170,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0,0,0,0)'
          },
          style: {
            width: 360,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor:'#ffffff',
            alignSelf: 'center',
            borderRadius: 26.5,
            backgroundColor: 'rgba(0,0,0,0)',
            justifyContent: 'center',
        
            
          },
          indicatorStyle: {
            width: 187,
            height: 48,
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
          <Tab.Screen name="Lucky Draws" component={LuckyDraws} />
        <Tab.Screen name="Live Game Shows" component={LiveGameShows} />
        
      </Tab.Navigator>
    </View>
  );
}

export default Tabs;
