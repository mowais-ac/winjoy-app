import React, {useState} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import Label from '../Label';
import LoaderImage from '../LoaderImage';
import ProfilePicture from '../ProfilePicture';
import styles from './Styles';
const {width, height} = Dimensions.get('window');
function GameShowWinnersCard({onPress, date, profile_image, name, ammount}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={true}>
      <View style={[styles.mainView]}>
        <View style={styles.avatarView}>
          <ProfilePicture
            picture={profile_image}
            // id={userInfo?.id || userData?.id}
            name={name.charAt(0).toUpperCase()}
            style={styles.avatarView}
          />
          <View
            style={{
              position: 'absolute',
              width: width * 0.14,
              height: width * 0.14,
              top: height * 0.012,
              left: -3,
            }}>
            <Image
              source={require('../../assets/imgs/redStar.png')}
              style={{width: 15, height: 15}}
            />
          </View>
        </View>

        <View
          style={{
            height: height * 0.08,
            justifyContent: 'center',
            width: 190,
            //alignItems: 'flex-start',
          }}>
          <Text numberOfLines={1} style={styles.text}>
            {date}
          </Text>
          <Text numberOfLines={1} style={styles.text2}>
            {name}
          </Text>
        </View>

        <Text numberOfLines={1} style={[styles.text2, {color: '#420E92'}]}>
          AED {ammount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export {GameShowWinnersCard};
