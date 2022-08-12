import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import up_arrow from '../../assets/imgs/arrow-u.png';
import down_arrow from '../../assets/imgs/d-arrow.png';
import {TextStroke} from '../TextStroke';
const Liveerror = props => {
  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props.setLE_Visible(false)}
      isVisible={props.LE_Visible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        props.setLE_Visible(false);
      }}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props.setLE_Visible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.uppertextbody}>
              <Text style={styles.uppertext1}>
                sorry, you don't have suffecient lives
              </Text>
            </View>
            <View style={styles.strokbody}>
              <Text style={styles.stroktext}>
                To enter in this draw,you need to have 120 lives.
              </Text>
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => props.onPress()}
                style={styles.submitbtn}>
                <Text style={styles.submittext}>Buy Lives Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setLE_Visible(false)}
                style={styles.closebtn}>
                <Text style={styles.closetext}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Liveerror;

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
    marginTop: 420,
    //height: '60%',
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
  notch: {
    height: 4,
    backgroundColor: '#E6DFEE',
    borderRadius: 100,
    marginTop: '5%',
    width: '40%',
    alignSelf: 'center',
  },
  container: {
    height: '85%',
    // marginTop: '5%',
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
  },
  submitbtn: {
    height: 45,
    marginTop: '7%',
    backgroundColor: '#420E92',
    borderRadius: 50,
    width: '80%',
  },
  submittext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#fff',
    marginTop: '3%',
    alignSelf: 'center',
  },
  closebtn: {
    height: 43,
    marginTop: '4%',
    backgroundColor: '#fff',
    borderColor: '#420E92',
    borderWidth: 1,
    borderRadius: 50,
    width: '80%',
  },
  closetext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#420E92',
    marginTop: '3%',
    alignSelf: 'center',
  },
  uppertextbody: {justifyContent: 'center', alignItems: 'center'},
  uppertext1: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
    fontSize: 20,
  },
  uppertext2: {
    color: '#000',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 22,
  },
  mainbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  strokbody: {justifyContent: 'center', alignItems: 'center'},
  stroktext: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
  },
});
