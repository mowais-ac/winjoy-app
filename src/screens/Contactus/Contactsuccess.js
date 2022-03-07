import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function Contactsuccess() {
  return (
    <>
      <View
        style={{
          marginTop: 24,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 300,
        }}>
        <Image
          style={{width: 50, height: 50}}
          resizeMode="contain"
          source={require('../../assets/imgs/check1.png')}
        />
        <Text style={styles.ty}>Thank you</Text>
        <Text style={styles.lowerText}>
          We're recevied your query, please sit back and relax. We usally
          respond to any query with in 24 hours.
        </Text>
        <View>
          <TouchableOpacity
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
                Go to Home Page
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Contactsuccess;

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
  },
  ty: {
    color: '#420E92',
    fontFamily: 'Axiforma-Bold',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
  },
  headerText: {
    color: '#D9FE51',
    fontFamily: 'Axiforma-Bold',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '600',
  },

  lowerText: {
    color: '#0B2142',
    lineHeight: 20,
    fontFamily: 'Axiforma-Regular',
    marginHorizontal: 15,
    textAlign: 'center',
  },
  subHeaderText: {
    lineHeight: 18,
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Axiforma-Regular',
    marginHorizontal: 30,
    textAlign: 'center',
  },
});
