import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import up_arrow from '../../assets/imgs/arrow-u.png';
import down_arrow from '../../assets/imgs/d-arrow.png';
import tropy from '../../assets/imgs/t.png';
import LinearGradient from 'react-native-linear-gradient';
import ProfilePicture from '../ProfilePicture';

const WinnerModal = props => {
  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props?.setWmodalVisible(false)}
      isVisible={props.WmodalVisible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        props.setWmodalVisible(false);
      }}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props?.setWmodalVisible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.tropybody}>
            <Image source={tropy} style={{width: 50, height: 50}} />
          </View>
          <View style={styles.container}>
            <View style={styles.uppertextbody}>
              <View style={styles.strokbody}>
                <Text style={styles.stroktext}>CONGRATULATION</Text>
              </View>
              <Text style={styles.uppertext2}>The Winner is</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ProfilePicture
                picture={props?.Winner?.profile_image}
                //id={props?.Winner?.id}
                name={
                  props?.Winner?.first_name?.slice(0, 1)?.toUpperCase() +
                  props?.Winner?.last_name?.slice(0, 1)?.toUpperCase()
                }
                style={styles.avatarView}
                font={24}
              />
              <View style={{marginVertical: 10}}>
                <Text numberOfLines={1} style={styles.winnertext}>
                  {props?.Winner?.user_name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default WinnerModal;

const styles = StyleSheet.create({
  MainView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(91, 73, 118, 0.4)',
  },
  centeredView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 460,
    //height: '60%',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 2,
    borderColor: '#20212429',
    borderRadius: 5,
    paddingHorizontal: '3%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 19.46,
    elevation: 4,
  },
  container: {
    height: '80%',
    // marginTop: '5%',
    justifyContent: 'space-evenly',
  },
  uppertextbody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uppertext2: {
    color: '#000',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 35,
  },
  avatarView: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  strokbody: {justifyContent: 'center', alignItems: 'center'},
  stroktext: {
    textShadowColor: '#E7003F',
    textShadowOffset: {width: 0, height: 0},
    color: '#fff',
    fontSize: 35,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
  tropybody: {
    borderWidth: 1,
    borderColor: '#420E92',
    width: 75,
    height: 75,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: -35,
  },
  winnertext: {
    color: '#E7003F',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Axiforma-Regular',
  },
});
