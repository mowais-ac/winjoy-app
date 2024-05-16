import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const Nolives = props => {
  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props?.setNolivemodalVisible(false)}
      isVisible={props?.NolivemodalVisible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        props.setNolivemodalVisible(false);
      }}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props?.setNolivemodalVisible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.textbody}>
              <Text numberOfLines={1} style={styles.text1}>
                Sorry, You don't have suffecinet lives
              </Text>
              <Text style={styles.text2}>
                To enter in this draw you need to have 120 lives, Please Buy
                your live in text step
              </Text>
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity style={styles.submitbtn}>
                <Text style={styles.submittext}>Buy Lives Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setNolivemodalVisible(false)}
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

export default Nolives;
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
  notch: {
    height: 4,
    backgroundColor: '#E6DFEE',
    borderRadius: 100,
    marginTop: '5%',
    width: '40%',
    alignSelf: 'center',
  },
  container: {
    height: '70%',
    width: '90%',

    // marginTop: '5%',
  },
  submitbtn: {
    height: 45,
    marginTop: '7%',
    backgroundColor: '#420E92',
    borderRadius: 50,
    width: '90%',
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
    marginTop: '3%',
    backgroundColor: '#fff',
    borderColor: '#420E92',
    borderWidth: 1,
    borderRadius: 50,
    width: '90%',
  },
  closetext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#420E92',
    marginTop: '3%',
    alignSelf: 'center',
  },
  mainbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbody: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#420E92',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Axiforma-bold',
    lineHeight: 30,
  },

  text2: {
    color: '#777777',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Axiforma-Regular',
    lineHeight: 17,
  },
});
