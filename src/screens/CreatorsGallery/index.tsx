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
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import LoaderImage from '../../Components/LoaderImage';
import {GetGalleryData} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import GalleryViewModal from '../../Components/GalleryViewModal';
import { galleryData } from '../../reduxToolkit/actions/gallery.actions';
import useSelector from '../../reduxToolkit/useSelector';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}:any) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(null);
  const creatorId = useSelector(state => state.celebs.creator);
  const galleryDatas = useSelector(state => state.gallery.galleryData);
  const [headerValue, setHeaderValue] = useState(0);
  const [fullImage, setFullImage] = useState('');
  const ModalState = useRef();
  useEffect(() => {
    dispatch(galleryData(creatorId));
  }, []);
  const onPressNext = () => {
    if (index < galleryDatas?.data?.gallery?.length - 1) setIndex(index + 1);
  };
  const onPressPrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
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
          colors={['#f8d7e8', '#c7dfe8']}
          style={{minHeight: height}}>
          <Image
            source={require('../../assets/imgs/creatorImage.png')}
            style={styles.mainView}
          />

          <View
            style={{
              marginTop: height * 0.1,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              width: width * 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: width * 0.11,
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={[
                      styles.headerText,
                      {fontFamily: 'Axiforma-Regular', fontSize: RFValue(12)},
                    ]}>
                    Back
                  </Text>
                </TouchableOpacity>
                <View
                  style={{backgroundColor: '#FFFFFF', width: 1, height: 22}}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  width: width * 0.5,
                }}>
                <Avatar
                  rounded
                  size={50}
                  // title="MD"
                  source={{
                    uri: galleryDatas?.data?.user?.profile_image,
                  }}
                />
                <View style={{}}>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        fontFamily: 'Axiforma-Regular',
                        fontSize: RFValue(12),
                        right: 2,
                      },
                    ]}>
                    {galleryDatas?.data?.user?.first_name}
                  </Text>
                  <Text
                    style={[
                      styles.headerText,
                      {fontSize: RFValue(14), left: 3},
                    ]}>
                    Gallery
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={[
                styles.headerText,
                {
                  fontFamily: 'Axiforma-Regular',
                  fontSize: RFValue(10),
                  marginTop: 10,
                },
              ]}>
              {galleryDatas?.data?.gallery?.length} found
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 15,
              paddingBottom: 15,
            }}>
            <FlatList
              data={galleryDatas?.data?.gallery}
              scrollEnabled={false}
              style={{paddingLeft: 12}}
              numColumns={3}
              renderItem={({item, index}) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(index);
                      setFullImage(item?.thumbnail);

                      ModalState.current(true);
                    }}>
                    <LoaderImage
                      source={{
                        uri: item?.thumbnail,
                      }}
                      style={{
                        width: width * 0.29,
                        height: height * 0.14,
                        borderRadius: 15,
                        marginTop: 10,
                      }}
                      resizeMode="stretch"
                    />
                  </TouchableOpacity>
                  <View style={{width: width * 0.03}} />
                </>
              )}
              contentContainerStyle={{
                paddingBottom: 12,
                marginTop: 10,
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </LinearGradient>
        {galleryDatas?.data?.gallery ? (
          <GalleryViewModal
            ModalRef={ModalState}
            details
            index={index}
            imageUrl={galleryDatas?.data?.gallery[index]?.thumbnail}
            id={1}
            onPressNext={() => onPressNext()}
            onPressPrevious={() => onPressPrevious()}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
