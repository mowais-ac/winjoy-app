import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import room from '../../assets/imgs/room.png';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import arrow from '../../assets/imgs/arrowww.png';
const Collabs = () => {
  return (
    <View
      style={{
        width: 200,
        height: 230,
        backgroundColor: '#D7D7EB',
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity>
        <ImageBackground
          resizeMode="cover"
          source={room}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'Axiforma',
                paddingLeft: 15,
                fontSize: 18,

                alignSelf: 'flex-start',
                top: 148,
              }}>
              Nomshi
            </Text>
            <TouchableOpacity
              style={{
                width: 180,
                height: 35,
                borderRadius: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                top: 158,
              }}>
              <Text
                style={{
                  color: '#E7003F',
                  fontWeight: '700',
                  fontFamily: 'Axiforma-Regular',
                  fontSize: 15,
                }}>
                Find Products
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Collabs;
