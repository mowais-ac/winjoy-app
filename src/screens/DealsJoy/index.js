import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
} from 'react-native';
import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';
import {wait} from '../../Constants/Functions';
import Label from '../../Components/Label';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import HomeBottomList from '../../Components/HomeBottomList';
import {widthConverter} from '../../Components/Helpers/Responsive';
import Header from '../../Components/Header';
import {DealsJoyAPI} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import {ClosingSoonCard} from '../../Components';
import HowItWorkModal from '../../Components/HowItWorkModal';
import {RFValue} from 'react-native-responsive-fontsize';

const index = ({props, navigation}) => {
  const dispatch = useDispatch();
  const dealsJoyData = useSelector(state => state.app.dealsJoyData);
  const [buffer, setBuffer] = useState(false);
  const [videoAction, setVideoAction] = useState(true);
  const [loader, setLoader] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const AddModalState = useRef();

  //console.log({props: dealsJoyData});

  useEffect(() => {
    dispatch(DealsJoyAPI());
  }, []);
  const onRefresh = React.useCallback(() => {
    dispatch(DealsJoyAPI());
    wait(1000).then(() => setRefreshing(false));
  }, []);
  function _renderItem({item, index}) {
    if (item.type === 'image') {
      return (
        <View key={index}>
          <Image
            source={{uri: item.url}}
            resizeMode={'cover'}
            style={styles.ShoppingBanner}
          />
        </View>
      );
    } else {
      return (
        <View
          key={index}
          style={{
            backgroundColor: '#000000',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          {item.url ? (
            <Video
              source={{uri: item.url}} // Can be a URL or a local file.
              // ref={(ref) => { this.player = ref }}  // Store reference
              resizeMode={'cover'}
              paused={index !== activeSlide}
              //  onError={this.onVideoError}
              minLoadRetryCount={2}
              fullScreen={true}
              ignoreSilentSwitch={'obey'}
              onLoad={() => setBuffer(false)}
              onLoadStart={() => setVideoAction(false)}
              controls={false}
              onEnd={() => setVideoAction(true)}
              style={styles.ShoppingBanner}
            />
          ) : null}
        </View>
      );
    }
  }
  const fb_addtocart = () => {
    AppEventsLogger.logEvent('addtocart_dealzjoy', {
      parameters: 'success',
    });
  };
  // console.log('dealjoy', dealsJoyData?.products);
  return (
    <ScrollView
      style={{backgroundColor: '#ffffff'}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <LinearGradient colors={['#5B0C86', '#E7003F']} style={styles.mainView}>
        <Header
          style={{
            top: Platform.OS === 'android' ? 5 : height * 0.028,
            position: 'absolute',
            zIndex: 1000,
            left: 0,
          }}
        />
        {/*  <View style={{marginTop: 65, alignItems: 'center'}}>
          <Text style={[styles.headerText]}>DEALSJOY</Text>
          <Text style={styles.subHeaderText}>
            Dont Miss YOUR chance to WIN Great DEALS!
          </Text>
          <View
            style={{
              height: 1,
              width: width * 1,
              backgroundColor: 'rgba(178, 190, 181,0.5)',
              marginTop: height * 0.02,
            }}
          />
        </View> */}
        <View style={styles.wrap}>
          {loader ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Carousel
              layout={'default'}
              resizeMode={'cover'}
              loop={videoAction}
              autoplay={videoAction}
              autoplayInterval={3000}
              // ref={ref => this.carousel = ref}
              data={dealsJoyData?.banners}
              sliderWidth={width}
              itemWidth={width}
              renderItem={_renderItem}
              style={styles.ShoppingBanner}
              onSnapToItem={index => setActiveSlide(index)}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            AddModalState.current(true);
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: height * 0.015,
              justifyContent: 'center',
              width: width,
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../assets/imgs/circlePlaybtn.png')}
            />
            <Label
              primary
              font={RFValue(13)}
              bold
              dark
              style={{color: '#ffff', width: width * 0.4}}>
              How it works
            </Label>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: width * 1,
            backgroundColor: 'rgba(178, 190, 181,0.5)',
            marginTop: height * 0.02,
          }}
        />
        <Label
          notAlign
          primary
          font={16}
          dark
          style={{
            color: '#ffff',
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}>
          LATEST OFFER
        </Label>
        <View>
          <FlatList
            horizontal={true}
            style={{marginLeft: 1, minHeight: 50}}
            contentContainerStyle={{
              alignSelf: 'flex-start',
              paddingRight: width * 0.04,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={dealsJoyData?.products}
            renderItem={({item}) => (
              <ClosingSoonCard
                onPress={() => {
                  fb_addtocart();
                  navigation.navigate('ProductDetail', {
                    productId: item?.product?.id,
                  });
                }}
                props={props}
                index={item.index}
                item={item}
              />
            )}
            keyExtractor={index => index}
          />
        </View>

        <View
          style={{
            height: 1,
            width: width * 1,
            backgroundColor: '#E74F7D',
            marginTop: 13,
          }}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.push('BottomTabStack', {
              screen: 'PRODUCTS',
            })
          }>
          <Label
            primary
            font={16}
            bold
            dark
            style={{
              color: '#ffffff',
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}>
            View All Products
          </Label>
        </TouchableOpacity>
        <View style={{marginBottom: height * 0.01}} />
      </LinearGradient>
      <ScrollView horizontal={true}>
        {dealsJoyData?.lower_banners?.map((element, i) => {
          return (
            <View key={i} style={{margin: 10, flexDirection: 'row'}}>
              <Image
                source={{uri: element.url}}
                resizeMode={'cover'}
                style={{
                  height: height * 0.13,
                  width: width * 0.95,
                  borderRadius: 12,
                  marginRight: 10,
                }}
              />
            </View>
          );
        })}
      </ScrollView>

      <HomeBottomList data={dealsJoyData?.winners_collection} />
      <View style={{height: 20}} />
      <HowItWorkModal
        ModalRef={AddModalState}
        details
        cross={true}
        video={
          'https://winjoy-assets.s3.amazonaws.com/how_it_work/Mostafa_dealsjoy-wj+(1).mp4'
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ShoppingBanner: {
    width: width,
    height: height * 0.3,
    // marginTop: height * 0.015,
    alignSelf: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bgImageUpperView: {
    width: width * 1.01,
    height: height * 0.3,
    backgroundColor: 'rgba(231,0,63,0.15)',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingBottom: 10,
  },
  LinerGradientProgrees: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: 9,
  },
  headerText: {
    color: '#D9FE51',
    fontFamily: 'Axiforma-SemiBold',
    fontSize: RFValue(22),
    lineHeight: 30,
  },
  GreybarWidth: {
    width: widthConverter(120),
    height: 9,
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#EADFE3',
    borderRadius: 9,
  },
  containerprogressBar: {
    width: widthConverter(120),
    marginBottom: 2,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 3,
    marginLeft: 2,
  },
  mainView: {
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  wrap: {
    width: width,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Axiforma-Regular',
    //lineHeight: 20,
    alignItems: 'center',
  },
  textHeading: {
    textAlign: 'center',
    fontFamily: 'Axiforma-Bold',
    color: '#eb3d6e',
    fontSize: RFValue(13),
    fontWeight: '400',
    marginLeft: 20,
  },
});

export default index;
