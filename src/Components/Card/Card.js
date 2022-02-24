import React, {useEffect} from 'react';
import {View, Dimensions, Text} from 'react-native';
import Config from 'react-native-config';
import LoaderImage from '../LoaderImage';
const {width, height} = Dimensions.get('window');
import ProgressCircle from 'react-native-progress-circle';
import {SliderBox} from 'react-native-image-slider-box';
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
  console.log('imag', images);
  let progress = updated_stocks ? (updated_stocks / stock) * 100 : 0;
  useEffect(() => {
    console.log('imag', images);
  }, [images]);

  return (
    <View
      style={{
        width: '100%',
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                {updated_stocks || 0}
              </Text>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                sold
              </Text>
              <Text
                style={{
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 12,
                  color: '#E7003F',
                  lineHeight: 12,
                }}>
                out of
              </Text>
              <Text
                style={{
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
      {/* <LoaderImage
        source={
          {
            //    uri: images[0].image,
          }
        }
        style={{
          width: '100%',
          height: 200,
          borderRadius: 10,
        }}
        resizeMode="center"
      /> */}
      <View
        style={{
          flex: 1,
          marginTop: 8,
          flexDirection: 'row',
        }}>
        <SliderBox
          images={images}
          sliderBoxHeight={250}
          resizeMode={'center'}
          ImageComponentStyle={{
            width: '100%',
            height: 250,
            borderRadius: 10,
          }}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          // dotStyle={{top: 5}}
          autoplay={false}
          circleLoop={true}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          currentImageEmitter={index =>
            console.warn(`current pos is: ${index}`)
          }
        />
      </View>
    </View>
  );
}

export {Card};
