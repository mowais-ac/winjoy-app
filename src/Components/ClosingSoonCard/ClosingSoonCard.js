import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter, widthPercentageToDP} from '../Helpers/Responsive';
import LoaderImage from '../LoaderImage';
import Config from 'react-native-config';
import ProgressCircle from 'react-native-progress-circle';
const {width, height} = Dimensions.get('window');
function ClosingSoonCard({item}) {
  console.log('item.stock', item.stock);
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  // const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)[0]
  //   }`;
  return (
    <View
      style={{
        width: width * 0.38,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        borderRadius: 10,
      }}>
      <LoaderImage
        source={{
          // uri: ImgUrl.replace("http://", "https://"),
          uri: item?.product?.image,
        }}
        style={{
          width: '100%',
          height: 90,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        resizeMode="cover"
      />
      <Label primary font={11} dark style={{color: '#000000', marginTop: 7}}>
        Get a chance to
        <Label notAlign bold primary font={11} bold style={{color: '#E7003F'}}>
          {' '}
          WIN
        </Label>
      </Label>
      <Label
        bold
        font={11}
        dark
        style={{color: '#000000', width: '100%', marginBottom: 7}}>
        {item?.product?.title}
      </Label>
      {/* <Label  bold font={11} dark style={{ color: "#000000", }}>
      Edition
      </Label> */}
      <View style={styles.containerprogressBarWrap}>
        <View style={styles.containerprogressBar}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E7003F', '#420E92']}
            style={[
              styles.LinerGradientProgrees,
              {width: `${progress ? progress : 2}%`},
            ]}
          />
        </View>
        <Label primary font={10} style={{color: '#877C80', top: 4}}>
          {item?.product?.updated_stocks ? item?.product?.updated_stocks : 0}{' '}
          sold out of {item?.product?.stock}
        </Label>
      </View>
    </View>
  );
}

export {ClosingSoonCard};
