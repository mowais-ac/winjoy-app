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
const { width, height } = Dimensions.get("window");

const PaymentModals = (props) => {
  console.log("props",props);
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
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          Payment Details
        </Label>
        <View style={styles.ModalBody}>
          <View style={styles.mView}>
            <Label notAlign darkmuted style={styles.titleTxt}>
              Name on Card
            </Label>
            <View style={styles.Main2}>
              <TextInput
                placeholder="Name on Card"
                placeholderTextColor={Colors.DARK_LABEL}
                keyboardType={"numeric"}
                // onBlur={onBlur}

                // onChangeText={HandleChange}
                style={styles.MarginLarge}
              />
            </View>
          </View>
          <View style={styles.mView}>
            <Label notAlign darkmuted style={styles.titleTxt}>
              Card Number
            </Label>
            <View style={[styles.Main2, { flexDirection: 'row', }]}>
              <TextInput
                placeholder="••••"
                placeholderTextColor={Colors.DARK_LABEL}
                keyboardType={"numeric"}
                maxLength={4}
                // onBlur={onBlur}

                // onChangeText={HandleChange}
                style={styles.MarginLargeNumber}
              />
              <TextInput
                placeholder="••••"
                placeholderTextColor={Colors.DARK_LABEL}
                keyboardType={"numeric"}
                maxLength={4}
                // onBlur={onBlur}

                // onChangeText={HandleChange}
                style={styles.MarginLargeNumber}
              />
              <TextInput
                placeholder="••••"
                placeholderTextColor={Colors.DARK_LABEL}
                keyboardType={"numeric"}
                maxLength={4}
                // onBlur={onBlur}

                // onChangeText={HandleChange}
                style={styles.MarginLargeNumber}
              />
              <TextInput
                placeholder="••••"
                placeholderTextColor={Colors.DARK_LABEL}
                keyboardType={"numeric"}
                maxLength={4}
                // onBlur={onBlur}

                // onChangeText={HandleChange}
                style={styles.MarginLargeNumber}
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row', width: width * 0.9, justifyContent: "space-between",

            alignSelf: "center",
          }}>
            <View style={[styles.mView, { width: width * 0.4 }]}>
              <Label notAlign darkmuted style={styles.titleTxt}>
              Expiry date
              </Label>
              <View style={styles.Main1}>
                <TextInput
                  placeholder="12/21 "
                  placeholderTextColor={Colors.DARK_LABEL}
                  keyboardType={"numeric"}
                  // onBlur={onBlur}

                  // onChangeText={HandleChange}
                  style={styles.MarginLarge}
                />

              </View>
            </View>
            <View style={[styles.mView, { width: width * 0.4  }]}>
              <Label notAlign darkmuted style={styles.titleTxt}>
                CVV
              </Label>
              <View style={styles.Main1}>
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor={Colors.DARK_LABEL}
                  keyboardType={"numeric"}
                  // onBlur={onBlur}

                  // onChangeText={HandleChange}
                  style={styles.MarginLarge}
                />

              </View>
            </View>
          </View>
     
          <TouchableOpacity
              //onPress={() => {}}
              style={{
                height: heightConverter(20),
                width: width * 0.9,
                borderRadius:10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.06,
                marginLeft:width * 0.04,
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{
                  height: heightConverter(55),
                  width: width * 0.9,
                  borderRadius:20,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                colors={["#420E92", "#E7003F"]}

              >
                <Label primary font={16} bold style={{ color: "#ffffff" }}>
                 Pay AED {props.total.toLocaleString()}
                </Label>
              </LinearGradient>
            </TouchableOpacity>
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
            }}
          >
            Close
          </LabelButton>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModals;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.5,
    marginTop: height * 0.35,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
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
