import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {Avatar} from 'react-native-elements';
import Modals from '../Components/Modals';
import BuyLifeCongrats from '../Components/BuyLifeCongrats';
import PaymentModalExperience from '../Components/PaymentModalExperience';
const {width, height} = Dimensions.get('window');

const ExperienceCelebrityModal = props => {
  const ModalStateError = useRef();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [activity, setActivity] = useState(false);
  const [instructions, setInstructions] = useState('');
  const SucessModalState = useRef();
  const ApproveRef = useRef();
  const DeclineRef = useRef();
  const PayModalState = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };
  const BuyExperience = async () => {
    setActivity(true);
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      celebrity_id: props.celebrity_id,
      experience_id: props.experience_id,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body,
    };

    await fetch(`${Config.API_URL}/buy/experience`, requestOptions)
      .then(async response => response.json())
      .then(async res => {
        setActivity(false);

        if (res?.order) {
          SucessModalState.current(true);
        } else {
          ModalStateError.current(true, {
            heading: 'Alert',
            Error: res?.order?.status,
            // array: res.errors ? Object.values(res.errors) : [],
          });
        }
      })
      .catch(e => {
        Alert.alert('Error', e);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModelState({
          ...ModelState,
          state: !ModelState.state,
        });
        if (props.onClose) props.onClose();
      }}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.MainView} />

          <View style={styles.ModalView}>
            <View style={styles.SmallBorder} />

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View
                style={{
                  height: height * 0.16,
                  width: width * 0.9,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: props?.experienceDetail?.experience?.featured_image,
                  }}
                />
                <View style={{marginRight: 20}}>
                  <Text
                    style={{
                      color: '#0B2142',
                      fontFamily: 'Axiforma-SemiBold',
                      fontSize: RFValue(14),
                    }}>
                    {props?.experienceDetail?.experience?.title}
                  </Text>
                  <Text
                    style={{
                      color: '#420E92',
                      fontFamily: 'Axiforma-Bold',
                      fontSize: RFValue(14),
                    }}>
                    AED {props?.experienceDetail?.experience?.price}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{height: 1.3, width: '100%', backgroundColor: '#E6DFEE'}}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: height * 0.13,
                  width: width * 0.9,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar
                  rounded
                  size={75}
                  source={{
                    uri: props?.celebrityData?.profile_image,
                  }}
                />
                <View style={{marginLeft: 20, width: width * 0.67}}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Axiforma-Regular',
                      fontSize: RFValue(12),
                      textAlign: 'left',
                    }}>
                    {props?.celebrityData?.bio}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{height: 1.3, width: '100%', backgroundColor: '#E6DFEE'}}
            />
            <View style={{marginTop: 20, marginLeft: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Axiforma-Regular',
                  fontSize: RFValue(12),
                }}>
                Portfolio
              </Text>

              <FlatList
                data={props?.experienceDetail?.celebrity_porttfolio}
                horizontal={true}
                ListEmptyComponent={() => (
                  <Text style={{color: '#000000'}}>The list is empty</Text>
                )}
                ItemSeparatorComponent={() => <View style={{width: 12}} />}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: width * 0.6,
                      height: height * 0.16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: width * 0.6,
                        height: height * 0.16,
                        borderRadius: 10,
                        position: 'absolute',
                      }}
                      source={{
                        uri: item?.thumbnail,
                      }}
                    />
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                      }}
                      resizeMode="center"
                      source={require('../assets/imgs/playbutton.png')}
                    />
                  </View>
                )}
                //keyExtractor={(e) => e.id.toString()}
                contentContainerStyle={{
                  marginTop: 10,
                  paddingRight: 10,
                  // marginLeft: width * 0.03
                }}
                // refreshControl={
                //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                // }
                keyExtractor={item => item.id}
              />
              <View>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Axiforma-Regular',
                    fontSize: RFValue(12),
                    paddingVertical: 10,
                  }}>
                  Intstructions
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#E6DFEE',
                    height: height * 0.13,
                    width: width * 0.9,
                    borderRadius: 10,
                    color: '#000000',
                    textAlignVertical: 'top',
                  }}
                  onChangeText={text => setInstructions(text)}
                  keyboardType="default"
                />
              </View>
              <View
                style={{
                  height: 1.3,
                  width: '100%',
                  backgroundColor: '#E6DFEE',
                  marginTop: 25,
                }}
              />
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Axiforma-Regular',
                  fontSize: RFValue(12),
                  width: '90%',
                  textAlign: 'center',
                  marginTop: 10,
                  color: '#420E92',
                }}>
                Total:{' '}
                <Text style={{fontSize: RFValue(16)}}>
                  AED {props?.experienceDetail?.experience?.price}
                </Text>
              </Text>
            </View>

            <View style={styles.ModalBody}>
              <TouchableOpacity
                onPress={() => {
                  return alert(
                    'Thank you for your interest. Shopping experience is coming soon.',
                  );
                  PayModalState.current(true);
                }}
                disabled={activity}
                style={{
                  height: heightConverter(15),
                  width: width * 0.9,

                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height * 0.04,
                  marginLeft: width * 0.04,
                }}>
                <View
                  style={{
                    height: heightConverter(55),
                    width: width * 0.9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#420e92',
                    borderRadius: 40,
                  }}>
                  {activity ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Label primary font={16} bold style={{color: '#ffffff'}}>
                      Pay Now
                    </Label>
                  )}
                </View>
              </TouchableOpacity>
              <LabelButton
                primary
                headingtype="h3"
                bold
                style={[
                  styles.CloseBtn,
                  {color: '#6F5F87', fontSize: RFValue(14)},
                ]}
                onPress={() => {
                  setModelState({
                    ...ModelState,
                    state: !ModelState.state,
                  });
                }}>
                Close
              </LabelButton>
            </View>
            <Modals
              ModalRef={ModalStateError}
              Error
              onClose={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}
            />
            <BuyLifeCongrats
              ModalRef={SucessModalState}
              heading={'Congratulations'}
              description={'successfully Bought Experience'}
              requestOnPress={() => {
                SucessModalState.current(false);
              }}
              closeOnPress={() => {
                SucessModalState.current(false);
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}
            />
            <PaymentModalExperience
              ModalRef={PayModalState}
              details
              total={props?.experienceDetail?.experience?.price}
              celebrity_id={props?.celebrity_id}
              experience_id={props?.experience_id}
              instructions={instructions}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

export default ExperienceCelebrityModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height,
    marginTop: height * 0.01,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.01,
  },

  ModalBody: {
    backgroundColor: Colors.WHITE,
    height: height * 0.3,
  },
  CheckImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: height * 0.1,
    marginTop: height * 0.09,
  },
  TextHeading: {
    marginTop: height * 0.02,
  },
  RequestMsg: {
    marginTop: height * 0.01,
    width: width * 0.75,
    lineHeight: height * 0.03,
  },

  CloseBtn: {
    marginTop: height * 0.02,
  },

  ConView: {
    height: height * 0.1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: 'center',
  },
  ReqMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.035,
  },
  ConfirmMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.03,
  },
  ApproveBtn: {
    marginTop: height * 0.01,
  },
  DeclineBtn: {
    marginTop: height * 0.02,
  },

  ErrorView: {
    height: height * 0.44,
    marginTop: height * 0.56,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ErrorBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.4,
  },

  ErrorTxt: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  ///new added
  Main1: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  Main2: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  mView: {
    justifyContent: 'center',

    alignSelf: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
  },
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03,
    width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
});
