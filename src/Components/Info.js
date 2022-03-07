import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Colors, Images } from "../Constants/Index";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

const Info_btn = (props) => {

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

      <TouchableWithoutFeedback
        onPress={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
          if (props.onClose) props.onClose();

        }}
      >
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>

      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <View
        style={{
          dispaly: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          marginTop: 20,
          marginHorizontal:15
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
          onPress={() => navigation.navigate('UserAgreement')}>
          <Text style={{color: '#420E92'}}>User Agreement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
          onPress={() => navigation.navigate('TermsAndConditions')}>
          <Text style={{color: '#420E92'}}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
          onPress={() => navigation.navigate('FAQS')}>
          <Text style={{color: '#420E92'}}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
          onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={{color: '#420E92'}}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

export default Info_btn;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  //height of modal
  ModalView: {
    height: height * 0.6,
    marginTop: height * 0.75,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  
  SmallBorder: {
    width: width * 0.35,
    height: 3,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.06,
  },
  ModalHead: {
    marginTop: height * 0.01,

  },

  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.4,
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
    flexDirection: 'row',
    justifyContent: "center",
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.02,
    backgroundColor: '#f4edef',
    height: height * 0.08,

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
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03, width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01
  },
  MarginLarge: {
    width: width * 0.65,
    paddingLeft: width * 0.06,
    fontSize: RFValue(14),
    color: Colors.DARK_LABEL
  },
});
