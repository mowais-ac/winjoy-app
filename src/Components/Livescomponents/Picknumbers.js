import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import Modal from 'react-native-modal';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {JSONtoForm} from '../../Constants/Functions';
import DeviceInfo from 'react-native-device-info';
import Modals from '../Modals';
const Picknumbers = props => {
  const ModalStateError = useRef();
  const buildNumber = DeviceInfo.getBuildNumber();
  const Is_platform = Platform.OS === 'android' ? 'android' : 'ios';
  const [Feild, setField] = useState(null);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(Feild);
  const enter_gameshow = useCallback(async () => {
    setLoading(true);
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      device_using: Is_platform,
      device_version: parseInt(buildNumber),
      live_gameshow_id: parseInt(props?.id),
      verification_code: parseInt(Feild),
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body,
    };
    // console.log(body);
    // console.log(Feild);
    const result = await fetch(
      'https://winjoy.incubyter.com/public/api/joinGameshow',
      requestOptions,
    );
    const json = await result.json();
    //console.log(json);
    if (json?.status === 'success') {
      setLoading(false);
      if (json?.livegameshow?.code === Feild) {
        props?.setPnmodalVisible(false);
        props?.Quiz();
        props?.test();
      }
    } else {
      setLoading(false);
      ModalStateError.current(true, {
        heading: 'Error',
        Error: json.message ? json.message : 'you entered invalid code',
      });
    }
  });
  return (
    <Modal
      useNativeDriverForBackdrop
      hasBackdrop={true}
      isVisible={props.PnmodalVisible}
      style={{margin: 0}}>
      {/*   <TouchableOpacity
        onPress={props?.setPnmodalVisible(false)}
        style={styles.MainView}
      /> */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.textbody}>
              <Text numberOfLines={2} style={styles.text1}>
                Please enter the 6-digit code to join the gameshow
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                height: 45,
                backgroundColor: '#ECF1F9',
                borderRadius: 20,
                //borderWidth: 0.9,
                //borderColor: props?.code != Feild ? 'red' : '#fff',
              }}>
              <TextInput
                maxLength={6}
                placeholder="Enter 6 numbers"
                style={{
                  paddingHorizontal: 10,
                  color: '#000',
                  alignSelf: 'center',
                  paddingVertical: 13,
                }}
                onChangeText={e => setField(e)}
                keyboardType={'number-pad'}
              />
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                disabled={Feild === null ? true : false}
                onPress={() => enter_gameshow()}
                style={[
                  styles.submitbtn,
                  {backgroundColor: Feild === null ? '#B5ABC4' : '#420E92'},
                ]}>
                {loading ? (
                  <View style={{marginTop: 11.5}}>
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                ) : (
                  <Text style={styles.submittext}>Enter Now</Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => props?.setPnmodalVisible(false)}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Axiforma',
                  color: 'red',
                  marginTop: 8,
                  textAlign: 'center',
                  lineHeight: 23,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modals ModalRef={ModalStateError} Error />
    </Modal>
  );
};

export default Picknumbers;
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
    /*  marginTop: 460, */
    height: '35%',
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
    height: 200,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '5%',
  },
  submitbtn: {
    height: 45,
    marginTop: 10,
    borderRadius: 50,
    width: '90%',
  },
  submittext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#fff',
    marginTop: '3%',
    textAlign: 'center',
    lineHeight: 27,
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
    width: '90%',
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
    lineHeight: 20,
    textAlign: 'center',
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
