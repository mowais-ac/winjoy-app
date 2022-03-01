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
function HomeCard({style, onPress, gameShow, time, images, upcoming_gameshow}) {
  const {width, height} = Dimensions.get('window');
  const [renderBtn, setRenderBtn] = useState(false);
  function _renderItem({item, index}) {
    return (
      <View key={index}>
        <Image
          style={[styles.mainView, {overlayColor: '#f6f1f3'}]}
          source={{uri: item.url}}
        />
      </View>
    );
  }
  return (
    <View style={styles.mainViewWrap}>
      <View style={[styles.mainView, style]}>
        <Image
          style={[
            styles.mainView,
            {position: 'absolute', overlayColor: '#f6f1f3'},
          ]}
          source={{uri: images[0]?.url}}
        />
        <View style={styles.textView}>
          {gameShow?.status === 'on_boarding' ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.commingSoonTxt}>LIVE</Text>
                <Text style={[styles.commingSoonTxt, {color: '#D9FE51'}]}>
                  TRIVIA
                </Text>
              </View>

              <LongButton
                style={[
                  styles.Margin,
                  {
                    backgroundColor: null,

                    borderWidth: 2,
                    borderColor: '#fff',
                  },
                ]}
                textstyle={{
                  color: '#fff',
                  fontFamily: 'Axiforma-SemiBold',
                  fontSize: 14,
                }}
                text="Lets Begin"
                font={16}
                shadowless
                onPress={onPress}
              />
            </View>
          ) : gameShow?.status === 'inprocess' || gameShow === '' ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View>
                <Text
                  style={[
                    styles.commingSoonTxt,
                    {fontFamily: 'Axifroma-Regular', marginBottom: 15},
                  ]}>
                  Prize
                </Text>
                <Text style={styles.commingSoonTxt}>
                  AED{' '}
                  {FormatNumber(+upcoming_gameshow?.price?.toLocaleString())}
                </Text>
              </View>
              <View style={{paddingTop: 5}}>
                <Text style={[styles.commingSoonTxt, {fontSize: 13}]}>
                  TRIVIA
                </Text>
                <Text
                  style={[
                    styles.commingSoonTxt,
                    {color: '#ffffff', fontSize: 13},
                  ]}>
                  COMING SOON
                </Text>
                <CountDown
                  style={{marginTop: 3}}
                  size={12}
                  until={time}
                  onFinish={() => setRenderBtn(true)}
                  digitStyle={{
                    backgroundColor: '#ffffff',
                    height: 25,
                  }}
                  digitTxtStyle={{
                    color: '#420E92',
                    fontSize: 13,
                    fontFamily: 'Axiforma-Medium',
                  }}
                  timeLabelStyle={{color: 'red'}}
                  separatorStyle={{
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
                  }}
                  showSeparator
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export {HomeCard};
