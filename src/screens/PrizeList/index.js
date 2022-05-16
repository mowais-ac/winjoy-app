import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import BackgroundRound from '../../Components/BackgroundRound';
import Header from '../../Components/Header';
import Label from '../../Components/Label';
import LongButton from '../../Components/LongButton';
import {ChanceCard} from '../../Components';
import {wait} from '../../Constants/Functions';
import {getProducts} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RFValue} from 'react-native-responsive-fontsize';
import appsFlyer from 'react-native-appsflyer';
const {width, height} = Dimensions.get('window');
const index = ({props, navigation}) => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const productsData = useSelector(state => state?.app?.productsData);
  const [headerValue, setHeaderValue] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const [selected, setSelected] = useState(null);
  const [link, setLink] = useState('');
  const loading = useSelector(state => state.event.loading);
  const dispatch = useDispatch();
  console.log('productsData', productsData?.data);
  const [productlength, setProductlength] = useState('');
  useEffect(() => {
    dispatch(getProducts('?is_closing_soon=0'));
    setProductlength(
      productsData?.data?.length ? productsData?.data?.length : '',
    );
    setIsClosing(false);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProducts(isClosing));
    wait(500).then(() => setRefreshing(false));
  }, []);
  const CategoryFunc = (index, id) => {
    let link = `?is_closing_soon=${isClosing ? 1 : 0}&category=${id}`;
    setSelected(index);

    dispatch(getProducts(link));
    setUpdateData(!updateData);
  };
  const eventName = 'af_add_to_cart';
  const eventValues = {
    af_price: 99,
    af_content_id: 5,
    af_currency: 'AED',
    af_quantity: 1,
  };
  const fun_addtocart = () => {
    appsFlyer.logEvent(
      eventName,
      eventValues,
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      },
    );
  };
  return (
    <SafeAreaView>
      <BackgroundRound height={0.3} />
      <Header
        style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
          width: '100%',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          top: Platform.OS === 'android' ? 0 : height * 0.038,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onScroll={e => {
          setHeaderValue(e.nativeEvent.contentOffset.y);
        }}>
        <Label
          primary
          font={16}
          bold
          dark
          style={{color: '#ffff', marginTop: height * 0.07}}>
          {t('do_not_miss_chance')}
        </Label>
        <Label primary font={16} bold dark style={{color: '#ffff'}}>
          win great deals
        </Label>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <LongButton
            onPress={() => {
              dispatch(getProducts('?is_closing_soon=0'));
              setIsClosing(false);
              setUpdateData(!updateData);
              setSelected(null);
            }}
            style={[
              styles.Margin,
              {
                backgroundColor: !isClosing ? '#fff' : null,
                borderWidth: isClosing ? 1 : null,
                borderColor: isClosing ? '#ffffff' : null,
              },
            ]}
            textstyle={{color: isClosing ? '#fff' : '#000000'}}
            text={
              'All ' +
              (!isClosing
                ? productsData?.data?.length
                  ? '(' + productsData?.data?.length + ')'
                  : ''
                : ' ')
            }
            font={16}
            shadowless
          />
          <LongButton
            onPress={() => {
              dispatch(getProducts('?is_closing_soon=1'));
              setIsClosing(true);
              setUpdateData(!updateData);
              setSelected(null);
            }}
            style={[
              styles.Margin,
              {
                backgroundColor: isClosing ? '#fff' : null,
                borderWidth: 1,
                borderColor: '#ffffff',
              },
            ]}
            textstyle={{color: isClosing ? '#000000' : '#ffffff'}}
            text={t('closing_soon')}
            font={16}
            shadowless
          />
        </View>
        {/* <View>
          <FlatList
            data={productsData?.categories_collection}
            scrollEnabled={true}
            extraData={updateData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  CategoryFunc(index, item?.id);
                }}>
                <Text
                  style={{
                    color: selected === index ? '#fff' : '#E899B8',
                    fontFamily: 'Axiforma-Bold',
                    fontSize: RFValue(15),
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <Text
                style={{color: '#000000', textAlign: 'center', width: width}}>
                The list is empty
              </Text>
            )}
            contentContainerStyle={{
              paddingTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            ItemSeparatorComponent={() => <View style={{width: 15}} />}
          />
        </View> */}
        <View>
          {/* onPress={()=>navigation.navigate("SimpeStackScreen",{screen:"ProductDetail"})}> */}

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <FlatList
              data={productsData?.data}
              scrollEnabled={false}
              extraData={updateData}
              renderItem={({item}) => (
                <ChanceCard
                  title={item?.product?.title}
                  updated_stocks={item?.updated_stock}
                  stock={item?.stock}
                  image={item?.product?.image}
                  description={item?.description}
                  price={item?.product?.price}
                  prize_title={item.prize_title}
                  draw_description={item?.end_date}
                  data={item}
                  onPress={() => {
                    fun_addtocart();
                    navigation.navigate('ProductDetail', {
                      productId: item?.product?.id,
                    });
                  }}
                />
              )}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <>
                  {loading ? (
                    <ActivityIndicator size="large" color="#000000" />
                  ) : (
                    <Text
                      style={{
                        color: '#000000',
                        top: 300,
                        textAlign: 'center',
                        width: width,
                        height: 350,
                      }}>
                      The list is empty
                    </Text>
                  )}
                </>
              )}
              contentContainerStyle={{
                padding: 15,
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.45,
    backgroundColor: '#ffffff',
  },
});

export default index;
