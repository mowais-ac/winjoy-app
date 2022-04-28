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
    dispatch(ExperienceProductDetal(experience_celebrity_id, product_id));
  }, []);
  let progress = data?.products?.updated_stocks
    ? (data?.products?.updated_stocks / data?.products?.stock) * 100
    : 0;
  //
  // function uniqBy(a, key) {
  //     var seen = {};
  //     return a?.filter(function (item) {
  //         var k = key(item);
  //         return seen?.hasOwnProperty(k) ? false : (seen[k] = true);
  //     })
  // }
  const SaveIdInfo = async () => {
    // await EncryptedStorage.setItem("ids","");
    AsyncStorage.getItem('expData').then(favs => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push({
        experience_celebrity_id: experience_celebrity_id,
        product_id: product_id,
        is_from_experience: true,
      });

      const ids = favs.map(o => o.product_id);
      const filtered = favs.filter(
        ({product_id}, index) => !ids.includes(product_id, index + 1),
      );
      dispatch2({
        type: types.CART_COUNTER,
        counter: uniqueArray?.length,
      });
      return AsyncStorage.setItem('expData', JSON.stringify(filtered));
    });

    let dat = await AsyncStorage.getItem('expData');
  };
  {
    console.log('data1', data);
  }
  let images = [];
  images.push({
    image: data?.products?.image,
  });
  if (data && data.product) {
    images = [...images, data?.products?.images];
  }
  //console.log({pic: data});
  return (
    <>
      <ScrollView>
        <View style={{height: heightPercentageToDP('100%')}}>
          <LinearGradient
            style={styles.mainView}
            colors={['#420E92', '#E7003F']}>
            <View style={{height: 20}} />
            <Header back={true} />
          </LinearGradient>
          <View style={styles.upperView}>
            <Card
              images={images}
              stock={parseInt(data?.products?.stock)}
              updated_stocks={parseInt(data?.products?.updated_stocks)}
            />
          </View>
          <View style={styles.card}>
            <Label
              primary
              font={16}
              dark
              style={{color: '#000000', marginTop: 35}}>
              Get a chance to
              <Label notAlign primary font={16} bold style={{color: '#E7003F'}}>
                {' '}
                WIN
              </Label>
            </Label>
            <Label font={16} dark style={{color: '#000000'}}>
              {data?.products?.title}
            </Label>
            <Label
              font={12}
              light
              style={{
                color: '#000000',
                paddingVertical: 10,
                lineHeight: 17,
              }}>
              {/*    Max draw date{' '}
              {dayjs(productsDetails?.product?.luckydraw?.end_date).format(
                'MMMM DD, YYYY',
              )}{' '}
              or when the campaign is sold out, which is earliest */}
              Draw Date announce to be soon!
            </Label>
            <Text style={styles.closingTxt}>Closing Soon</Text>
          </View>
          <View style={styles.pdView}>
            <Label notAlign primary font={16} bold style={{color: '#E7003F'}}>
              Product Details
            </Label>
            <Label
              notAlign
              font={11}
              dark
              style={{color: '#000000', lineHeight: 20}}>
              {data?.products?.description}
            </Label>
          </View>
        </View>
      </ScrollView>

      <View style={styles.card2}>
        <View
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: widthPercentageToDP('83'),
          }}>
          <Text style={[styles.metaText, {fontWeight: 'bold'}]}>
            Buy a {data?.products?.title}
          </Text>
          {/*  <Text style={styles.text}>Gold Coin</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("SimpeStackScreen", {
            //     screen: "Cart",
            //   })]
            // SaveIdInfo();
            alert('Thank you for your interest. This feature is coming soon');
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
    </>
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
    /* top: heightPercentageToDP('8%'),
    position: 'absolute', */
    margin: 15,
    marginTop: -120,
  },
  card: {
    width: width - 25,
    height: height * 0.17,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,

    left: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
    marginTop: 2,
  },
  card2Wrap: {
    bottom: 10,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 15,
    width: '100%',
  },
  card2: {
    width: width - 25,
    height: height * 0.15,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 0,
    left: 2,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    marginBottom: 30,
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
    marginTop: 5,
    //position: 'absolute',

    //height: heightPercentageToDP('25'),
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
