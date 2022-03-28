import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  TopTab,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const index = ({route, navigation}) => {
  const [headerValue, setHeaderValue] = useState(0);
  const [selected, setSelected] = useState(0);

  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}
        style={{flex: 1}}>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <ScrollView
          onScroll={e => {
            setHeaderValue(e.nativeEvent.contentOffset.y);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#420E92', '#E7003F']}
            style={{
              height: 'auto',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <View
              style={{marginVertical: 10, alignItems: 'center', marginTop: 50}}>
              <Text style={[styles.headerText]}>Games Rules</Text>
            </View>
          </LinearGradient>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.heading}>ABC</Text>
              <Text style={styles.paragraph}>123</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
