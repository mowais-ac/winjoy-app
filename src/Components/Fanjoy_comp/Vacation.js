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
const Vacation = props => {
  return (
    <View
      style={{
        width: 150,
        height: 150,
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
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: 'Axiforma',
              paddingLeft: 10,
              fontSize: 18,
              top: 20,
            }}>
            {props.title}
          </Text>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderRadius: 5,
              backgroundColor: '#E7003F',
              alignItems: 'center',
              justifyContent: 'center',
              top: 88,
              left: 118,
            }}>
            <Image source={arrow} style={{width: 13, height: 13}} />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Vacation;
