import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {WjBackground} from '../../Components';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import Contactsuccess from './Contactsuccess';
const {width, height} = Dimensions.get('window');

function Contactus() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setmessage] = useState('');
  const [success, setSuccess] = useState(false);
  console.log(message);
  const post_Api = async () => {
    const token = await EncryptedStorage.getItem('Token');
    const body = {message: message};
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    await fetch(
      'https://winjoy.incubyter.com/public/api/generate/ticket',
      requestOptions,
    )
      .then(async response => response.json())
      .then(async res => {
        setIsLoading(true);
        console.log(res);
        setSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{paddingBottom: 10, height: 750}}>
          <WjBackground
            style={{
              height: 155,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <Header style={{top: 0, position: 'absolute', marginTop: 10}} />

          <View style={{marginTop: height * 0.1, alignItems: 'center'}}>
            <Text style={[styles.headerText]}>Contact Us</Text>
            <Text style={styles.subHeaderText}>
              We're here to help and answer any questions you might have.
            </Text>
          </View>
          {!success ? (
            <>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  height: 350,
                  alignItems: 'center',
                }}>
                <Text style={styles.lowerText}>
                  Please select a topic below related to your inquiry. We
                  respond to any query within 24 hours.
                </Text>
                <TextInput
                  placeholderTextColor="black"
                  placeholder="write your message"
                  multiline={true}
                  numberOfLines={6}
                  onChangeText={setmessage}
                  value={message}
                  style={styles.textarea}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={post_Api}
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
                    {/* {isLoading && (
                      <ActivityIndicator size="large" color="#ffff" />
                    )} */}
                    {isLoading ? (
                      <ActivityIndicator size="large" color="white" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#ffff',
                          textAlign: 'center',
                          fontFamily: 'Axiforma-Bold',
                        }}>
                        Send Message
                      </Text>
                    )}
                    {/*   <Text
                      style={{
                        fontSize: 17,
                        color: '#ffff',
                        textAlign: 'center',
                        fontFamily: 'Axiforma-Bold',
                      }}>
                      Send Message
                    </Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View>
              <Contactsuccess />
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Contactus;

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
  },
  headerText: {
    color: '#D9FE51',
    fontFamily: 'Axiforma-Bold',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '600',
  },
  textarea: {
    backgroundColor: '#ffff',
    width: 350,
    height: 210,
    textAlignVertical: 'top',
    borderRadius: 15,
    padding: 10,
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
