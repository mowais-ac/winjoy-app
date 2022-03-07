import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Colors, Images} from '../Constants/Index';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import LongButton from './LongButton';
const {width, height} = Dimensions.get('window');

const Info_btn = props => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (props.updatedVersion > props.currentV) {
      setShowModal(true);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      statusBarTranslucent={false}>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <View>
          <Image
            source={require('../../src/assets/imgs/newlogo.png')}
            style={{
              marginTop: 15,
              width: 85,
              height: 85,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              marginTop: 25,
              color: '#420e92',
              fontFamily: 'Axiforma-Bold',
            }}>
            New Update is available
          </Text>
          <Text
            style={{
              lineHeight: 25,
              fontSize: 15.5,
              textAlign: 'center',
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
              fontFamily: 'Axiforma-Regular',
              marginHorizontal: 10,
            }}>
            Seems like, your app is not up to date, please visit Google
            playstore to our app.
          </Text>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.winjoy',
                )
              }
              style={{
                alignSelf: 'center',
              }}>
              <View
                style={{
                  height: 55,
                  width: width * 0.9,
                  justifyContent: 'center',
                  backgroundColor: '#420e92',
                  borderRadius: 40,
                }}>
                <Text
                  style={{
                    fontSize: 17,

                    color: '#ffff',
                    textAlign: 'center',
                    fontFamily: 'Axiforma-Bold',
                  }}>
                  Go to Goolge Play Store
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Info_btn;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  //height of modal
  ModalView: {
    height: height * 0.5,
    marginTop: height * 0.555,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },

  SmallBorder: {
    width: width * 0.35,
    height: 3,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: 8,
  },
});
