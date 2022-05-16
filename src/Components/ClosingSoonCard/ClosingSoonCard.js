import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import LoaderImage from '../LoaderImage';

const {width, height} = Dimensions.get('window');

function ClosingSoonCard({item, onPress}) {
  let progress = parseInt(item.updated_stock)
    ? (parseInt(item.updated_stock) / parseInt(item?.stock)) * 100
    : 0;

  return (
    <View
      style={{
        width: width * 0.38,
        height: 'auto',
        backgroundColor: '#ffffff',
        marginLeft: 10,
        borderRadius: 10,
      }}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {/*  <LoaderImage
          source={{
            uri: item?.product?.image,
          }}
          style={{
            width: '100%',
            height: 90,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="center"
        /> */}
        <Image
          source={{
            uri: item?.product?.image,
          }}
          style={{
            width: '100%',
            height: 90,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="center"
        />

        <Label
          primary
          font={11}
          dark
          style={{
            color: '#000000',
            marginVerstical: 5,
            lineHeight: Platform.OS === 'android' ? 0 : 20,
          }}>
          Get a chance to
          <Label notAlign bold primary font={10} style={{color: '#E7003F'}}>
            {' '}
            WIN
          </Label>
        </Label>
        <Label
          bold
          font={10}
          dark
          style={{color: '#000000', height: 38, lineHeight: 12, width: '85%'}}>
          {item?.prize_title}
        </Label>

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
            {parseInt(item?.updated_stock) ? parseInt(item?.updated_stock) : 0}{' '}
            sold out of {parseInt(item?.stock)}
          </Label>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export {ClosingSoonCard};
