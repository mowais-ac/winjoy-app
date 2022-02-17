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
  useEffect(() => {}, []);

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
          <WjBackground
            style={{
              height: height * 0.18,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: height * 0.07,
              height: height * 0.15,
              alignItems: 'center',
            }}>
            <View style={{marginBottom: height * 0.01}}>
              <Text style={[styles.headerText]}>User Agreement</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.heading}>Personal Information:</Text>
              <Text style={styles.paragraph}>
                When you register as a member on the Platform, update your
                information, buy products or services, participate in
                promotions, or send emails to Us, you give Us with information
                that We keep and process. Your name, address, phone number,
                email address, purchase and transaction history, interests, and
                other 'Personal Information' may be included.
              </Text>
              <Text style={styles.heading}>General Information:</Text>
              <Text style={styles.paragraph}>
                As a result of your visits to and use of the Platform, we also
                obtain more general information from you. This general
                information does not identify you personally and may include
                your IP address, the date and time you access the Platform, the
                length of time you spend on the Platform, your browsing history
                (recorded by the text and graphics files that make up that
                page), the Internet address of the website from which you linked
                directly to our Platform, and other such 'General Information.'
              </Text>

              <Text style={styles.heading}>
                Collecting and Using Information
              </Text>

              <Text style={styles.paragraph}>
                Credit/debit card information, as well as&nbsp;personal info,
                will NOT be recorded, sold, shared, rented, or leased to any
                third party.
              </Text>

              <Text style={styles.paragraph}>
                Most of the Platform can be used without disclosing any personal
                information to Us. Certain services, on the other hand, may need
                you to provide personal information. We use your information to
                improve your experience, specifically to: maintain internal
                records; improve our goods, services, and the Platform; and
                interact with you if you have ordered, purchased, or engaged in
                anything on the Platform; We may contact you for market research
                purposes, and We may send you information about new
                opportunities, promotions, special offers, and other information
                that We believe is relevant to you.We may keep a record of any
                correspondence you provide to Us through the Platform or by
                email to the addresses shown on the Platform.
              </Text>

              <Text style={styles.paragraph}>
                We use General Information to make the Platform more useful to
                visitors (including assessing content of interest to visitors),
                as well as for other purposes such as determining the Platform's
                technical design specifications and identifying system
                performance or problem areas, tracking activity on the Platform,
                preparing reports, assessing trends, and otherwise monitoring
                the way the Platform is used, none of which would be in a way
                that personally would decry.
              </Text>

              <Text style={styles.paragraph}>
                Some of the advertisements you see on the Platform are chosen
                and delivered by third parties such as ad networks, advertising
                agencies, advertisers, and audience segment suppliers. These
                third parties may use cookies, web beacons, and other
                technologies to collect information about you and your online
                activities, either on the Platform or on other websites, in
                order to understand your interests and offer customized
                advertising to you. Please bear in mind that We have no access
                to or control over any information gathered by these third
                parties. The information practices of these third parties are
                not covered by this privacy policy.
              </Text>

              <Text style={styles.heading}>
                Non-Disclosure of Personal Information
              </Text>

              <Text style={styles.paragraph}>
                You agree to the sharing of your Personal Information inside
                Winjoy General Trading LLC. We will not disclose, sell, or rent
                your Personal Information to any third party outside Winjoy
                General Trading LLC unless we have your permission, are required
                to do so by law or a regulatory authority, or are acting to
                protect our own legitimate interests.
              </Text>

              <Text style={styles.heading}>Security</Text>

              <Text style={styles.paragraph}>
                We place a high priority on protecting your Personal Information
                and preventing unauthorized access, and we take all reasonable
                efforts to safeguard your Personal Information from unauthorized
                access, use, alteration, disclosure, or destruction. While We
                have put in place physical, technological, and administrative
                safeguards to protect and preserve your Personal Information, We
                cannot guarantee that the Personal Information you submit or
                transmit over the Platform or e-mail is absolutely secure and
                safe.
              </Text>

              <Text style={styles.heading}>Use of Cookies</Text>

              <Text style={styles.paragraph}>
                The Platform, like many other websites, makes use of cookies,
                which are little files that store information on your computer's
                hard drive. Cookies allow the Platform to recognize account
                holders, track new users, collect session information, and
                improve your overall experience. Most browsers accept cookies by
                default, however you can disable cookies in your browser if you
                choose. For online advertising campaigns, cookies are
                automatically deleted after one (1) month.
              </Text>

              <Text style={styles.paragraph}>
                We recommend that you leave cookies "on" in order to have a
                better experience on the Platform. Cookies may be delivered to
                you on occasion by organizations advertising on Our behalf or on
                behalf of Our subsidiaries. We have no control over these
                cookies, and they are not covered by our Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
