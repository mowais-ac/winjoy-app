import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import CountDown from 'react-native-countdown-component';
import {useNavigation} from '@react-navigation/native';
let timer = () => {};
const Redirecting = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(5);
  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabStack'}],
        });
        //navigation.navigate('Landing');
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    start();
  }, []);
  const start = () => {
    setTimeLeft(5);
    clearTimeout(timer);
    startTimer();
  };
  return (
    <View style={styles.mainbody}>
      <View style={styles.container}>
        <Text style={styles.tytext}>THANK YOU FOR JOINING US LIVE</Text>
      </View>
      <View style={styles.redirectingbody}>
        <Text style={styles.redirectingtext}>Redirecting...</Text>
        <Text style={styles.countertext}> {timeLeft} </Text>
      </View>
    </View>
  );
};

export default Redirecting;
const styles = StyleSheet.create({
  mainbody: {
    height: '22%',
    width: '90%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    alignItems: 'center',
    //justifyContent: 'space-around',
    marginBottom: '10%',
    backgroundColor: '#fff',
  },
  container: {
    width: '60%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tytext: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
    fontSize: 20,
  },
  redirectingbody: {
    height: 100,
    width: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  redirectingtext: {
    color: '#000',
    fontFamily: 'Axiforma-bold',
    fontWeight: '600',
    fontSize: 16.5,
  },
  countertext: {
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    color: '#000',
    fontSize: 17,
  },
});
