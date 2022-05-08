import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../Constants/Index';
const {width, height} = Dimensions.get('window');

const GoBack = props => {
  const navigation = useNavigation();
  return (
    // <LongButton
    //   text="Go back"
    //   shadowless
    //   font={12}
    //   MutedBtn
    //   onPress={() => navigation.goBack()}
    //   {...props}
    //   style={[styles.Main, props.style]}
    // />
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <BackIcon
          name="ios-chevron-back"
          size={20}
          color="#FFFFFF"
          style={{top: height * 0.001}}
        />
        <Text style={styles.text}>Back</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Main: {
    width: width * 0.3,
    height: height * 0.06,
  },
  container: {
    width: width * 0.95,
    height: Platform.OS === 'android' ? height * 0.08 : height * 0.14,

    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(12),
    color: Colors.LABEL,
  },
});

export default GoBack;
