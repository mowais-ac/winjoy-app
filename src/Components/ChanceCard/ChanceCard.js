import React, {useState} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter, widthPercentageToDP} from '../Helpers/Responsive';
import LoaderImage from '../LoaderImage';
import Config from 'react-native-config';
import ProgressCircle from 'react-native-progress-circle';
import {FormatNumber} from '../../Constants/Functions';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
function ChanceCard({
  onPress,
  updated_stocks,
  stock,
  title,
  draw_description,
  image,
  price,
  prize_title,
  data,
}) {
  let progress = updated_stocks ? (updated_stocks / stock) * 100 : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        width: '100%',
        //  height: height * 0.53,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        // justifyContent: "center",
        alignItems: 'center',
        elevation: 3,
        marginBottom: 15,
      }}>
      <View
        style={{
          width: '100%',
          height: height * 0.28,
          borderRadius: 10,
          marginTop: height * 0.02,
        }}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: '100%',
            height: height * 0.25,
            borderRadius: 10,
          }}
          resizeMode="contain"
        />
        {/*  <LoaderImage
          source={{
            uri: image,
          }}
          style={{
            width: '100%',
            height: height * 0.25,
            borderRadius: 10,
          }}
          resizeMode="contain"
        /> */}
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#e2ebed',
          width: '100%',
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'Axiforma-Bold',
            fontSize: 16,
            color: '#000000',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Axiforma-Bold',
            fontSize: 16,
            color: '#420E92',
          }}>
          AED {FormatNumber(price)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: 5,
          marginBottom: 5,
          paddingHorizontal: 15,
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Axiforma-Regular',
              fontSize: 14,
              color: '#420E92',
            }}>
            Get a chance to{' '}
            <Text
              style={{
                fontFamily: 'Axiforma-Bold',

                color: '#E7003F',
              }}>
              WIN
            </Text>
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: 'Axiforma-Bold',
              fontSize: 12,
              color: '#000000',
              lineHeight: 17,
              width: width * 0.6,
            }}>
            {prize_title}
          </Text>
        </View>
        <View>
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
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderRadius: 35,
              width: 250,
              alignItems: 'center',
            }}
            colors={['#E7003F', '#420E92']}>
            <Text
              style={{
                fontFamily: 'Axiforma-Regular',
                fontSize: 16,
                color: '#ffffff',
              }}>
              Buy Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {data.enable_buy ? (
        <Label
          font={12}
          light
          style={{
            color: '#000000',
            paddingVertical: 10,
            lineHeight: 17,
          }}>
          Max draw date {dayjs(draw_description).format('MMMM DD, YYYY')} or
          when the campaign is sold out, which is earliest
        </Label>
      ) : (
        <Label
          font={12}
          light
          style={{
            color: '#000000',
            paddingVertical: 10,
            lineHeight: 17,
          }}>
          Draw Date announce to be soon!
        </Label>
      )}
    </TouchableOpacity>
  );
}

export {ChanceCard};
