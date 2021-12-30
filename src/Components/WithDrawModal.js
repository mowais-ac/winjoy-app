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
  TextInput
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
import { strings } from "../i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
const { width, height } = Dimensions.get("window");

const WithDrawModal = (props) => {
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
        <KeyboardAwareScrollView keyboardDismissMode="interactive">
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Label notAlign primary font={16} bold2 style={{ color: "#E7003F", }}>
              {strings("wallet.your_wallet")}
            </Label>

            <Label notAlign primary font={18} dark style={{ color: "#0B2142" }}>
              <Label notAlign primary font={18} dark style={{ color: "#0B2142" }}>
                AED
              </Label>
              {" "}{props.yourBalance}
            </Label>
            <View style={{ width: 20, backgroundColor: '#E7003F', height: 3, alignSelf: 'flex-start', marginTop: 8, marginLeft: 20 }} />
          </View>
          <View style={styles.Main1}>
            <Label notAlign primary font={16} bold2 dark style={{ width: 50, color: "#000000", top: 17, }}>
              AED
            </Label>
            <TextInput
              placeholderTextColor={Colors.DARK_LABEL}
              keyboardType={"numeric"}
              // onBlur={onBlur}
              onChangeText={props.AmmountHandleChange}
              style={styles.MarginLarge}
            />

          </View>
          <View style={styles.ModalBody}>

            <TouchableOpacity
              onPress={() => { props.onPressWithDrawal() }}
              style={{
                height: heightConverter(20),
                width: width * 0.9,

                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
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
                <Label primary font={16} bold style={{ color: "#ffffff" }}>
                  REQUEST WITHDRAWAL
                </Label>
              </View>
            </TouchableOpacity>
            <Label primary notAlign headingtype="h3" bold2 font={16} style={{ marginTop: height * 0.06, color: '#000000', marginLeft: width * 0.04, }}>
              Your remaining balance will be
            </Label>
            <Label primary notAlign headingtype="h3" bold2 font={16} style={{ marginLeft: width * 0.04, }}>
              AED 50
            </Label>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default WithDrawModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.5,
    marginTop: height * 0.52,
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
    marginTop: height * 0.01,

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
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL
  },
});
