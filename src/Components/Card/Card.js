import React, {useEffect} from 'react';
import {View, Dimensions, Text, Image} from 'react-native';

const {width, height} = Dimensions.get('window');
import ProgressCircle from 'react-native-progress-circle';

import Carousel from 'react-native-snap-carousel';
function Card({
  options,
  onPress,
  reset,
  result,
  optionDisable,
  images,
  updated_stocks,
  stock,
  removeProgressCircle,
}) {
  let progress = updated_stocks ? (updated_stocks / stock) * 100 : 0;
  useEffect(() => {}, [images]);

  return (
    <View
      style={{
        width: '100%',
        height: 230,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
      }}>
      <View style={{position: 'absolute', top: 10, zIndex: 1000, left: 10}}>
        {!removeProgressCircle ? (
          <ProgressCircle
            percent={progress}
            radius={35}
            borderWidth={6}
            color="#e7003f"
            shadowColor="#d3d9dd"
            bgColor="#fff">
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                {updated_stocks || 0}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                sold
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                out of
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 14,
                }}>
                {stock}
              </Text>
            </View>
          </ProgressCircle>
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          // marginTop: 8,
          flexDirection: 'row',
        }}>
        {console.log({'images::': images})}
        <Carousel
          layout={'default'}
          resizeMode={'contain'}
          autoplayInterval={3000}
          data={images}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: item?.image}}
                resizeMode={'contain'}
                style={{
                  width: '80%',
                  height: height * 0.27,
                  //marginTop: height * 0.015,
                  alignSelf: 'center',
                }}
              />
            );
          }}
          style={{
            width: width,
            height: height * 0.27,
            // marginTop: height * 0.015,
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
}

export {Card};
