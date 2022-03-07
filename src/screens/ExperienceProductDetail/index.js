import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {Card} from '../../Components';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Components/Helpers/Responsive';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExperienceProductDetal} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
const ProductDetail = ({props, navigation, route}) => {
  const product_id = route?.params?.product_id;
  const experience_celebrity_id = route?.params?.experience_celebrity_id;
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const data = useSelector(state => state?.app?.expProductDetail);
  useEffect(() => {
    console.log('exid', 'pid', experience_celebrity_id, product_id);
    dispatch(ExperienceProductDetal(experience_celebrity_id, product_id));
    console.log('dataExp', data);
  }, []);
  let progress = data?.products?.updated_stocks
    ? (data?.products?.updated_stocks / data?.products?.stock) * 100
    : 0;

  const SaveIdInfo = async () => {
    AsyncStorage.getItem('expData').then(favs => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push({
        experience_celebrity_id: experience_celebrity_id,
        product_id: product_id,
        is_from_experience: true,
      });
      console.log('favs', favs);
      const ids = favs.map(o => o.product_id);
      const filtered = favs.filter(
        ({product_id}, index) => !ids.includes(product_id, index + 1),
      );

      return AsyncStorage.setItem('expData', JSON.stringify(filtered));
    });

    let dat = await AsyncStorage.getItem('expData');
    console.log('dat', dat);
  };

  return (
    <ScrollView>
      <View style={{height: heightPercentageToDP('100%')}}>
        <LinearGradient style={styles.mainView} colors={['#420E92', '#E7003F']}>
          <View style={{height: 20}} />
          <Header back={true} />
        </LinearGradient>
        <View style={styles.upperView}>
          <Card
            imageUrl={data?.products?.image}
            stock={data?.products?.stock}
            updated_stocks={data?.products?.updated_stocks}
          />
        </View>
        <View style={styles.card}>
          <Label
            primary
            font={16}
            dark
            style={{color: '#000000', marginTop: 30}}>
            Get a chance to
            <Label notAlign primary font={16} bold style={{color: '#E7003F'}}>
              {' '}
              WIN
            </Label>
          </Label>
          <Label font={16} dark style={{color: '#000000'}}>
            {data?.products?.title}
          </Label>
          <Text style={styles.closingTxt}>Closing Soon</Text>
        </View>
        <View style={styles.pdView}>
          <Label notAlign primary font={16} bold style={{color: '#E7003F'}}>
            Products Details
          </Label>
          <Label
            notAlign
            font={11}
            dark
            style={{color: '#000000', lineHeight: 20}}>
            {data?.products?.description}
          </Label>
        </View>
        <View style={styles.card2}>
          {/*  <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP('83'),
            }}>
            <Text style={styles.metaText}>To enter in the lucky draw</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {'AED '}
              {+data?.products?.price?.toLocaleString()}
            </Text>
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP('83'),
            }}>
            <Text style={[styles.metaText, {fontWeight: 'bold'}]}>
              Buy a {data?.products?.title}
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {' '}
                {'AED '}
                {+data?.products?.price?.toLocaleString()}
                {' Gold Coin'}
              </Text>
            </Text>
            <Text style={styles.text}>Gold Coin</Text> 
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SimpeStackScreen', {
                screen: 'Cart',
              });
              SaveIdInfo();
            }}
            style={{
              height: heightConverter(55),
              width: width - 25,
              position: 'absolute',
              bottom: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: heightConverter(55),
                width: width - 25,
                position: 'absolute',
                bottom: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#420E92', '#E7003F']}>
              <Label primary font={16} bold style={{color: '#ffffff'}}>
                Add to Cart
              </Label>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: heightConverter(200),
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LinerGradientProgrees: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    borderRadius: 9,
    height: 14,
    left: 2,
  },
  GreybarWidth: {
    width: widthPercentageToDP('95'),
    height: 18,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthPercentageToDP('95'),
    marginBottom: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
    zIndex: 1,
  },
  upperView: {
    top: heightPercentageToDP('8%'),
    position: 'absolute',
  },
  card: {
    width: width - 25,
    height: height * 0.1,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    top: height * 0.1,
    left: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  card2: {
    width: width - 25,
    height: height * 0.15,
    //backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 0,
    left: 2,
    alignItems: 'center',
    // elevation: 3,
    position: 'absolute',
    marginBottom: 20,
  },
  closingTxt: {
    color: '#ffffff',
    backgroundColor: '#e7003f',
    fontFamily: 'Axiforma-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 20,
    top: heightConverter(2),
  },
  pdView: {
    position: 'absolute',
    bottom: heightPercentageToDP('25'),
    height: heightPercentageToDP('25'),
    padding: 20,
  },
  metaText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
  },
  text: {
    color: '#e7003f',
    fontFamily: 'Axiforma-Regular',
  },
});

export default ProductDetail;
