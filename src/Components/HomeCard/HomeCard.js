import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {widthConverter} from '../Helpers/Responsive';
import styles from './Styles';
import CountDown from 'react-native-countdown-component';
import LongButton from '../LongButton';
import Carousel from 'react-native-snap-carousel';
import {FormatNumber} from '../../Constants/Functions';
function HomeCard({
  style,
  onPress,
  gameShow,
  time,
  images,
  upcoming_gameshow,
  countDownFinish,
}) {
  const onCountDownFinish = () => {
    setRenderBtn(true);
    countDownFinish();
  };
  const {width, height} = Dimensions.get('window');
  const [renderBtn, setRenderBtn] = useState(false);
  function _renderItem({item, index}) {
    return (
      <View key={index}>
        <Image
          style={[styles.mainViewa, {overlayColor: '#f6f1f3'}]}
          source={{uri: item.url}}
        />
      </View>
    );
  }
  console.log({'gameShow?.status': gameShow?.status});
  return (
    <View style={styles.mainViewWrapa}>
      <View style={[styles.mainViewa, style]}>
        <Image
          style={[styles.mainViewa, {position: 'absolute'}]}
          source={{uri: images[0]?.url}}
        />
        <View style={styles.textViewa}>
          {gameShow?.status === 'on_boarding' ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.commingSoonTxta}>LIVE</Text>
                <Text style={[styles.commingSoonTxta, {color: '#D9FE51'}]}>
                  TRIVIA
                </Text>
              </View>
            </View>
          ) : gameShow?.status === 'inprocess' || gameShow === '' ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '94%',
              }}>
              <View>
                <Text
                  style={[
                    styles.commingSoonTxta,
                    {fontFamily: 'Axiforma-Regular', marginBottom: 15},
                  ]}>
                  Prize
                </Text>
                <Text style={styles.commingSoonTxta}>
                  AED{' '}
                  {FormatNumber(+upcoming_gameshow?.price?.toLocaleString())}
                </Text>
              </View>
              <View style={{paddingTop: 5}}>
                <Text style={[styles.commingSoonTxta, {fontSize: 13}]}>
                  TRIVIA
                </Text>
                <Text
                  style={[
                    styles.commingSoonTxta,
                    {color: '#ffffff', fontSize: 13},
                  ]}>
                  COMING SOON
                </Text>
                {time ? (
                  <CountDown
                    style={{marginTop: 3.5}}
                    size={12}
                    until={time}
                    onFinish={() => onCountDownFinish()}
                    digitStyle={{
                      backgroundColor: '#ffffff',
                      height: 25,
                    }}
                    digitTxtStyle={{
                      color: '#420E92',
                      fontSize: 13,
                      fontFamily: 'Axiforma-Medium',
                    }}
                    separatorStyle={{
                      marginBottom: 19,
                      color: '#D9FE51',
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    timeToShow={['D', 'H', 'M', 'S']}
                    timeLabels={{
                      d: 'days',
                      h: 'hours',
                      m: 'minutes',
                      s: 'seconds',
                    }}
                    timeLabelStyle={{
                      color: '#ffffff',
                      fontFamily: 'Axiforma-Regular',
                      fontSize: 8.6,
                    }}
                    showSeparator
                  />
                ) : null}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export {HomeCard};
