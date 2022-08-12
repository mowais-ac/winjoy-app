import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import room from '../../assets/imgs/room.png';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Slug_Details} from '../../redux/actions';
const Causes = props => {
  const progress = props?.u_stock ? (props?.u_stock / props?.stock) * 1 : 0;

  return (
    <View
      style={{
        width: 230,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
      }}>
      <TouchableOpacity onPress={props.onpress}>
        <Image
          source={{uri: props?.image}}
          style={{width: 230, height: 135, borderRadius: 10}}
        />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              marginTop: 3,
              color: '#777777',
              fontWeight: '600',
              fontFamily: 'Axiforma',
              paddingLeft: 12,
              alignSelf: 'flex-start',
            }}>
            Get a chance to
          </Text>
          <Text
            style={{
              color: '#E7003F',
              fontSize: 15.7,
              fontWeight: '700',
              fontFamily: 'Axiforma',
              lineHeight: 25,
            }}>
            {' '}
            <Text
              style={{
                color: '#420E92',
                fontSize: 15.7,
                fontWeight: '700',
                fontFamily: 'Axiforma',
                lineHeight: 25,
              }}>
              Win
            </Text>{' '}
            {props?.title}
          </Text>
          <View>
            <Text
              style={{
                color: '#420E92',
                fontSize: 11.5,
                fontWeight: '600',
                fontFamily: 'Axiforma',
                lineHeight: 20,
              }}>
              {props?.lives} Lives
            </Text>
            <Progress.Bar
              progress={20}
              width={205}
              height={7.7}
              borderWidth={null}
              unfilledColor={'#D7D7EB'}
              color={'#E7003F'}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 11.5,
                fontWeight: '600',
                fontFamily: 'Axiforma',
                lineHeight: 20,
              }}>
              {props?.u_stock} sold
            </Text>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#420E92', '#E7003F']}
            style={{
              marginVertical: 5,
              width: '80%',
              height: 35,
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
          <Text
            style={{
              color: '#420E92',
              fontSize: 12.5,
              fontWeight: '600',
              fontFamily: 'Axiforma',
            }}>
            Draw date to be announced soon
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Causes;
