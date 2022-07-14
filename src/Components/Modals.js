import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Label from './Label';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
const {width, height} = Dimensions.get('window');

const Modals = props => {
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const ApproveRef = useRef();
  const DeclineRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    //  console.log('props.ModalRef', props.ModalRef);
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };
  if (props.approve && ModelState.details && !ModelState.ForceSuccess) {
    const details = ModelState.details;

    const HandleRequest = async (ibool = false) => {
      if (
        !ApproveRef.current.GetActivity() &&
        !DeclineRef.current.GetActivity()
      ) {
        const Token = await EncryptedStorage.getItem('Token');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        };
        if (ibool === true) ApproveRef.current.SetActivity(true, 'WHITE');
        else DeclineRef.current.SetActivity(true);
        const URL =
          `${Config.API_URL}/requests/` +
          (ibool === true ? 'approved/' : 'decline/') +
          details.id;
        await fetch(URL, requestOptions)
          .then(async response => response.json())
          .then(async res => {
            if (res.status && res.status.toLowerCase() === 'success') {
              if (ibool === true) {
                await fetch(
                  `${Config.API_URL}/user/current-balance`,
                  requestOptions,
                )
                  .then(async response => response.json())
                  .then(async res => {
                    if (res.status && res.status.toLowerCase() === 'success') {
                      let coins = {
                        Balance: {'Gold Coins': res.data[0]['Gold Coins']},
                        date: GetDate(),
                      };
                      await fetch(
                        `${Config.API_URL}/credit/balance`,
                        requestOptions,
                      )
                        .then(async response => response.json())
                        .then(res => {
                          coins.Balance = {
                            ...coins.Balance,
                            'Gold Credit': res.outstanding_balance,
                          };
                        });
                      await EncryptedStorage.setItem(
                        'Coins',
                        JSON.stringify(coins),
                      );
                    }
                  });
              }
              setModelState({state: false});
              if (props.onHandled) props.onHandled(ibool);
            } else Alert.alert('Error', res.message);
          })
          .catch(e => console.log(e));
      }
    };
    const GetCoins = e => {
      switch (e) {
        case 'gold':
          return ['Gold coins', +details.Coins['Gold Coins']];
        case 'diamond':
          return ['Diamond coins', +details.Coins['Diamond Coins']];
        default:
          return ['Silver coins', +details.Coins['Silver Coins']];
      }
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
        <TouchableWithoutFeedback
          onPress={() => {
            if (
              !ApproveRef.current.GetActivity() &&
              !DeclineRef.current.GetActivity()
            ) {
              setModelState({
                ...ModelState,
                state: !ModelState.state,
              });
              if (props.onClose) props.onClose();
            }
          }}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Approve/Decline
          </Label>
          <View style={styles.ModalBody}>
            <View style={styles.ConView}>
              <ProfilePicture
                picture={details.user_receiver.profile_image}
                id={details.user_receiver.id}
                name={
                  details.user_receiver.first_name.slice(0, 1) +
                  details.user_receiver.last_name.slice(0, 1)
                }
                style={styles.ProfilePicture}
              />
              <View style={styles.ProfileInfo}>
                <Label headingtype="h5" notAlign dark bold>
                  {`${details.user_receiver.first_name} ${details.user_receiver.last_name}`}
                </Label>
                <Label notAlign darkmuted font={11}>
                  @{details.user_receiver.user_name}
                </Label>
              </View>
            </View>
            <Label dark headingtype="h4" style={styles.ReqMsg}>
              <Label dark bold headingtype="h4">
                {`${details.user_receiver.first_name} ${details.user_receiver.last_name}`}
              </Label>{' '}
              requested for{' '}
              <Label dark bold headingtype="h4">
                {parseInt(details.amount)} {details.coin_type}
              </Label>{' '}
              coins{' '}
            </Label>
            {GetCoins(details.coin_type)[1] - +details.amount > 0 ? (
              <Label dark style={styles.ConfirmMsg} headingtype="h5">
                After sending, your remaining balance will be{' '}
                <Label primary bold headingtype="h5">
                  {GetCoins(details.coin_type)[1] - details.amount}{' '}
                  {details.coin_type} coins
                </Label>
              </Label>
            ) : (
              <Label dark style={styles.ConfirmMsg} headingtype="h5">
                You don't have enough balance
              </Label>
            )}
            <LongButton
              gradient={GetCoins(details.coin_type)[1] - +details.amount > 0}
              text="Approve"
              MutedBtn={GetCoins(details.coin_type)[1] - +details.amount < 0}
              style={styles.ApproveBtn}
              shadowless
              onPress={() => {
                if (GetCoins(details.coin_type)[1] - +details.amount > 0)
                  HandleRequest(true);
              }}
              ref={ApproveRef}
            />
            <LongButton
              text="Decline"
              style={[styles.ProfileBtn, styles.DeclineBtn]}
              shadowless
              ref={DeclineRef}
              onPress={() => HandleRequest()}
            />
          </View>
        </View>
      </Modal>
    );
  } else if (props.Error && ModelState.details) {
    const details = ModelState.details;
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
        <TouchableWithoutFeedback
          onPress={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
            if (props.onClose) props.onClose();
          }}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ErrorView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            {details.heading}
          </Label>
          <View style={styles.ErrorBody}>
            <View style={styles.ErrorTxt}>
              <Label
                primary
                headingtype="h5"
                bold2
                style={styles.TextHeading}
                notAlign>
                An error has occured in the form:
              </Label>
              <Label
                dark
                style={styles.RequestMsg}
                notAlign
                text={details.Error}
              />
              {details?.array && details?.array?.length >= 1 && (
                <Label
                  dark
                  style={styles.RequestMsg}
                  notAlign
                  text={Object.values(details.array)[0][0]}
                />
              )}
            </View>
            <LongButton
              text="Close"
              style={[{marginTop: height * 0.06}, styles.ProfileBtn]}
              shadowless
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
                if (props.onClose) props.onClose();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  } else if (props.Alert) {
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
        <TouchableWithoutFeedback
          onPress={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
            if (props.onClose) props.onClose();
          }}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ErrorView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Alert
          </Label>
          <View style={styles.ErrorBody}>
            <View style={styles.ErrorTxt}>
              <Label
                headingtype="h5"
                bold2
                style={
                  ([styles.TextHeading],
                  {marginTop: 7, color: 'blue', lineHeight: 20})
                }
                notAlign>
                {props.message_error}
              </Label>
            </View>
            <LongButton
              text="Close"
              style={[{marginTop: height * 0.06}, styles.ProfileBtn]}
              shadowless
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
                if (props.onClose) props.onClose();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  } else
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
        <TouchableWithoutFeedback
          onPress={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
            if (props.onClose) props.onClose();
          }}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Thank you
          </Label>
          <View style={styles.ModalBody}>
            <Image
              source={Images.Check}
              style={[
                styles.CheckImage,
                props.ticket && {
                  marginTop: height * 0.06,
                },
              ]}
            />
            <Label primary headingtype="h2" bold2 style={styles.TextHeading}>
              {props.Request ? 'Request sent' : 'Success'}
            </Label>
            <Label dark style={styles.RequestMsg}>
              {props.ticket
                ? 'Your ticket has been sent to support, please sit back. We usually respond within 24 hours.'
                : 'Your request has been processed, if you have any query please contact support'}
            </Label>
            <LongButton
              text="Back to Home"
              style={[styles.ProfileBtnMargin, styles.ProfileBtn]}
              shadowless
              Activity={false}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'TabsStack'}],
                });
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
                if (props.onClose) props.onClose();
              }}
            />
            <LabelButton
              primary
              headingtype="h3"
              bold
              style={styles.CloseBtn}
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
                if (props.BothClose) {
                  navigation.goBack();
                }
                if (props.onClose) props.onClose();
              }}>
              Close
            </LabelButton>
          </View>
        </View>
      </Modal>
    );
};

export default Modals;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.65,
    marginTop: height * 0.35,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.03,
  },

  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.65,
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
  ProfileBtnMargin: {
    marginTop: height * 0.09,
  },
  ProfileBtn: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: Colors.INVISIBLE,
    width: width * 0.9,
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
});
