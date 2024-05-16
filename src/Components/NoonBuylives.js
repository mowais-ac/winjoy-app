import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import success from '../assets/imgs/tick.png';
import error from '../assets/imgs/error1.png';
const NoonBuylives = props => {
  return (
    <Modal
      //   swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props?.setSmodalVisible(false)}
      isVisible={props.SmodalVisible}
      style={{margin: 0}}
      //   onBackButtonPress={() => {
      //     props.setSmodalVisible(false);
      //   }}
    >
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props?.setSmodalVisible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props?.Data?.status === 'success' ? (
            <View style={styles.container}>
              <Text
                style={{
                  color: '#420E92',
                  fontFamily: 'Axiforma',
                  fontSize: 20,
                  paddingTop: 5,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: 28,
                }}>
                {props?.Data?.order?.status}
              </Text>
              <Image source={success} style={{width: 115, height: 115}} />

              <TouchableOpacity onPress={() => props?.setSmodalVisible(false)}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Axiforma',
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {props?.Data?.status === 'error' ? (
            <View style={styles.container}>
              <Text
                style={{
                  color: '#420E92',
                  fontFamily: 'Axiforma',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: 28,
                }}>
                {props?.Data?.message}
              </Text>
              <Image source={error} style={{width: 110, height: 110}} />
              <TouchableOpacity onPress={() => props?.setSmodalVisible(false)}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Axiforma',
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
export default NoonBuylives;

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
    backgroundColor: '#fff',
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
    marginTop: 8,
    alignItems: 'center',
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
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
