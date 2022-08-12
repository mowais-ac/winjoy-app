import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import room from '../../assets/imgs/room.png';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
const PrizesComp = props => {
  const progress = props?.u_stock ? (props?.u_stock / props?.stock) * 1 : 0;
  //console.log(progress);
  return (
    <View
      style={{
        width: 172,
        height: 260,
        backgroundColor: '#fff',
        borderRadius: 10,
        // marginRight: 10,
      }}>
      <TouchableOpacity>
        <Image
          source={{uri: props?.image}}
          style={{width: 172, height: 115, borderRadius: 10}}
        />
        <View style={{marginHorizontal: 8}}>
          <Text
            numberOfLines={1}
            style={{
              color: '#420E92',
              fontSize: 14,
              fontWeight: '700',
              fontFamily: 'Axiforma',
              lineHeight: 25,
            }}>
            {props?.title}
          </Text>
          <View style={{height: 73}}>
            <Text
              numberOfLines={3}
              style={{
                color: '#000',
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Axiforma',
              }}>
              {props?.title}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 8,
          }}>
          <Text
            style={{
              color: '#E7003F',
              fontSize: 13,
              fontWeight: '700',
              fontFamily: 'Axiforma',
            }}>
            30 Lives
          </Text>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#420E92', '#E7003F']}
            style={{
              marginVertical: 5,
              width: '50%',
              height: 34,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  lineHeight: 18,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: 'Axiforma',
                }}>
                Enter Now
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PrizesComp;
