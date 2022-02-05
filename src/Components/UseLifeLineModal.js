import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import Label from "./Label";
import LabelButton from "./LabelButton";
import { Colors, Images } from "../Constants/Index";
import LongButton from "./LongButton";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { GetDate } from "../Constants/Functions";
import ProfilePicture from "./ProfilePicture";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter } from "./Helpers/Responsive";
import * as Progress from 'react-native-progress';
const { width, height } = Dimensions.get("window");

const UseLifeLineModal = (props) => {
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
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
      }}
    >

      <View style={styles.MainView} />

      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />

        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../assets/imgs/emoji.png')}
          />
        </View>
        <View style={styles.ModalBody}>
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Wrong Answer
          </Label>
          <View style={[styles.SmallBorder, { width: width * 0.1 }]} />
          <Label primary headingtype="h1" bold2 style={{ color: "#420e92", marginTop: 10 }}>
            Use a life line
          </Label>
          <Label primary font={14} style={{ color: "#000000", marginTop: 10 }}>
            You've 5 lives
          </Label>
          <Label primary headingtype="h1" bold2 style={{ color: "#420e92", marginTop: 5 }}>
            {props.timeLeft}
          </Label>
   
            <TouchableOpacity
              onPress={() => { props.onPressContinueLifeLine() }}
              disabled={props.availLifeActivity}
              style={{
                height: heightConverter(20),
                width: width * 0.9,

                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.04,
                marginLeft: width * 0.04,
              }}
            >
              <View

                style={{
                  height: heightConverter(65),
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#420e92',
                  borderRadius: 40,
                }}


              >
                {props.availLifeActivity ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Label primary font={16} bold style={{ color: "#ffffff" }}>
                    Use a Life line
                  </Label>
                )}

              </View>
              {/* <Progress.Bar
             progress={props.timeLeft/3}
             width={width*0.85}
             height={height*0.06}
             unfilledColor={'#420E92'}
             borderRadius={height*0.05}
             borderWidth={0}
             color={"#9D0D5D"}
              />
              <Label primary font={14} bold style={{ color: "#ffffff",zIndex:100,position:'absolute' }}>
              Using your life line {props.timeLeft} seconds
              </Label> */}
            </TouchableOpacity>
    
          <LabelButton
            primary
            headingtype="h3"
            bold
            style={[styles.CloseBtn, { color: '#420e92' }]}
            onPress={() => {
             props.onPressNotNow()
            }}
          >
            Not now
          </LabelButton>
        </View>
      </View>
    </Modal>
  );
};

export default UseLifeLineModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.6,
    marginTop: height * 0.42,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalHead: {


  },

  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.3,
  },
  CheckImage: {
    alignSelf: "center",
    resizeMode: "contain",
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
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: "center",
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
    alignSelf: "center",
  },
  ///new added
  Main1: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  Main2: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  mView: {
    justifyContent: "center",

    alignSelf: "center",

  },
  MarginLarge: {
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL
  },
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03, width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01
  }
});
