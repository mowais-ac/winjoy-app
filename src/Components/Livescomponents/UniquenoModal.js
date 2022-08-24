import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
//import Modal from 'react-native-modal';
import up_arrow from '../../assets/imgs/arrow-u.png';
import down_arrow from '../../assets/imgs/d-arrow.png';
const UniquenoModal = props => {
  // console.log('aftab', props.no1, props.no2);
  const Increasement = no => {
    if (props?.no1 >= 0 && props?.no1 <= 8) {
      props?.setno1(props?.no1 + no);
    } else props?.setno1(0);
  };
  const Decreasement = no => {
    if (props?.no1 >= 1 && props?.no1 <= 8) {
      props?.setno1(props?.no1 - no);
    } else props?.setno1(0);
  };
  const Increasement2 = no => {
    if (props?.no2 >= 0 && props?.no2 <= 8) {
      props?.setno2(props?.no2 + no);
    } else props?.setno2(0);
  };
  const Decreasement2 = no => {
    if (props?.no2 >= 1 && props?.no2 <= 8) {
      props?.setno2(props?.no2 - no);
    } else props?.setno2(0);
  };
  const Increasement3 = no => {
    if (props?.no3 >= 0 && props?.no3 <= 8) {
      props?.setno3(props?.no3 + no);
    } else props?.setno3(0);
  };
  const Decreasement3 = no => {
    if (props?.no3 >= 1 && props?.no3 <= 8) {
      props?.setno3(props?.no3 - no);
    } else props?.setno3(0);
  };
  const Increasement4 = no => {
    if (props?.no4 >= 0 && props?.no4 <= 8) {
      props?.setno4(props?.no4 + no);
    } else props?.setno4(0);
  };
  const Decreasement4 = no => {
    if (props?.no4 >= 1 && props?.no4 <= 8) {
      props?.setno4(props?.no4 - no);
    } else props?.setno4(0);
  };
  const Increasement5 = no => {
    if (props?.no5 >= 0 && props?.no5 <= 8) {
      props?.setno5(props?.no5 + no);
    } else props?.setno5(0);
  };
  const Decreasement5 = no => {
    if (props?.no5 >= 1 && props?.no5 <= 8) {
      props?.setno5(props?.no5 - no);
    } else props?.setno5(0);
  };
  return (
    <Modal
      // swipeDirection={['down']}
      // useNativeDriverForBackdrop
      // hasBackdrop={true}
      // onSwipeComplete={() => props?.setUNM_Visible(false)}
      // isVisible={props?.UNM_Visible}
      // style={{margin: 0}}
      // onBackButtonPress={() => {
      //   props?.setUNM_Visible(false);
      // }}
      animationType="slide"
      transparent={true}
      visible={props?.UNM_Visible}
      statusBarTranslucent={false}
      onRequestClose={() => props?.setUNM_Visible(false)}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props?.setUNM_Visible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.uppertextbody}>
              <Text style={styles.uppertext1}>Golden Tulip Media Hotel</Text>
              <Text style={styles.uppertext2}>
                Choose 5 unique main numbers between 0-9
              </Text>
            </View>
            <View style={styles.countermainbody}>
              <View style={styles.counterbody}>
                <TouchableOpacity onPress={() => Increasement(1)}>
                  <Image source={up_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
                <View style={styles.countercircle}>
                  <Text style={styles.countercircletext}>{props?.no1}</Text>
                </View>
                <TouchableOpacity onPress={() => Decreasement(1)}>
                  <Image source={down_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.counterbody}>
                <TouchableOpacity onPress={() => Increasement2(1)}>
                  <Image source={up_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
                <View style={styles.countercircle}>
                  <Text style={styles.countercircletext}>{props?.no2}</Text>
                </View>
                <TouchableOpacity onPress={() => Decreasement2(1)}>
                  <Image source={down_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.counterbody}>
                <TouchableOpacity onPress={() => Increasement3(1)}>
                  <Image source={up_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
                <View style={styles.countercircle}>
                  <Text style={styles.countercircletext}>{props?.no3}</Text>
                </View>
                <TouchableOpacity onPress={() => Decreasement3(1)}>
                  <Image source={down_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.counterbody}>
                <TouchableOpacity onPress={() => Increasement4(1)}>
                  <Image source={up_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
                <View style={styles.countercircle}>
                  <Text style={styles.countercircletext}>{props?.no4}</Text>
                </View>
                <TouchableOpacity onPress={() => Decreasement4(1)}>
                  <Image source={down_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.counterbody}>
                <TouchableOpacity onPress={() => Increasement5(1)}>
                  <Image source={up_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
                <View style={styles.countercircle}>
                  <Text style={styles.countercircletext}>{props?.no5}</Text>
                </View>
                <TouchableOpacity onPress={() => Decreasement5(1)}>
                  <Image source={down_arrow} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => {
                  props?.setModalVisible(true);
                  props?.setUNM_Visible(false);
                }}
                style={styles.submitbtn}>
                <Text style={styles.submittext}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props?.setUNM_Visible(false)}
                style={styles.closebtn}>
                <Text style={styles.closetext}>Not Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default UniquenoModal;

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
    // marginTop: 320,
    height: '46%',
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
    height: '80%',
    marginTop: '5%',
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
    marginTop: '4%',
    alignSelf: 'center',
  },
  closebtn: {
    height: 43,
    marginTop: '2%',
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
    marginTop: '4%',
    alignSelf: 'center',
  },

  uppertextbody: {justifyContent: 'center', alignItems: 'center'},
  uppertext1: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
    fontSize: 15,
  },
  uppertext2: {
    color: '#000',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 22,
  },
  countermainbody: {
    marginTop: 15,
    width: '100%',
    height: 130,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  counterbody: {
    width: 60,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countercircle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#420E92',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countercircletext: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
    fontSize: 20,
  },
  mainbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
