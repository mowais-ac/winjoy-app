import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import up_arrow from '../../assets/imgs/arrow-u.png';
import down_arrow from '../../assets/imgs/d-arrow.png';
import {TextStroke} from '../TextStroke';
const Enterluckydraw = props => {
  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props.setELD_Visible(false)}
      isVisible={props.ELD_Visible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        props.setELD_Visible(false);
      }}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props.setELD_Visible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.uppertextbody}>
              <Text style={styles.uppertext1}>Golden Tulip Media Hotel</Text>
              <Text style={styles.uppertext2}>
                Use 30 lives to enter into the draw
              </Text>
            </View>
            <View style={styles.strokbody}>
              <Text style={styles.stroktext}>30 Lives</Text>
            </View>

            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={props?.JoinUsers()}
                style={styles.submitbtn}>
                {props.loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submittext}>Confirm</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setELD_Visible(false)}
                style={styles.closebtn}>
                <Text style={styles.closetext}>Hide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Enterluckydraw;

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
    marginTop: 400,
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
    height: '90%',
    // marginTop: '5%',
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
  },
  submitbtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#420E92',
    borderRadius: 50,
    width: '80%',
  },
  submittext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#fff',
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
    textShadowColor: '#420E92',
    textShadowOffset: {width: 0, height: 0},
    color: '#fff',
    fontSize: 35,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
});
