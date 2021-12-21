import React, { useState, useImperativeHandle, useRef } from "react";
import {
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { Colors, Images } from "../Constants/Index";
import Label from "./Label";
import LabelButton from "./LabelButton";
import Config from "react-native-config";
import { JSONtoForm } from "../Constants/Functions";
import CountryModal from "./CountryModal";

const { width, height } = Dimensions.get("window");

const InputField = React.forwardRef((props, ref) => {
  const [err, seterr] = useState(null);
  console.log("props.lang",props.lang);
  const [val, setval] = useState(null);
  const [isRight, setisRight] = useState(null);
  const [ActForCheck, setActForCheck] = useState(false);
  const [CountryCode, setCountryCode] = useState("971");
  const value = props.value;
  const countryref = useRef();

  useImperativeHandle(ref, () => ({
    getText() {
      const v = value && val === null ? value : val;
      return props.phone ? CountryCode + v : v;
    },
    IsNull() {
      const text = value && val === null ? value : val;
      if (text === null || text === "") {
        seterr(true);
        return true;
      }
      return false;
    },
    validateEmail() {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(val) === true) {
        return true;
      } else {
        seterr("** Invalid email");
        return false;
      }
    },
    validateVerify() {
      if (props.verify && props.maxLength) {
        if (!val || val.length < props.maxLength) {
          seterr("* Wrong Verify");
          return false;
        }
      }
      return true;
    },
    ValidatePass() {
      if (
        !val ||
        /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) === false ||
        val.length < 8
      ) {
        seterr("* Wrong Pass");
        return false;
      }
      return true;
    },
    ValidateOTP() {
      if (!val || val.length < 6) {
        seterr("* Wrong Code");
        return false;
      }
      return true;
    },
    Error(err) {
      seterr(err || true);
    },
    ChangeActforCheck(e) {
      setActForCheck(e);
    },
    GetActforCheck() {
      return ActForCheck;
    },
    validatePhone() {
      if (!val || /[0-9]{0,14}$/.test(val) === false) {
        seterr("* Wrong phone");
        return false;
      }
      return true;
    },
    SetText(e) {
      setval(e);
    },
  }));

  const HandleChange = (text) => {
    let t = text;
    if (props.keyboardType && props.keyboardType.toLowerCase() === "numeric") {
      t = t.replace(/[^0-9]/g, "");
    }
    if (props.onEdit) props.onEdit(t);
    if (props.CheckUser) {
      t = t.replace(/\s/g, '');
    }
    setisRight(null);
    setval(t);
    if (err) seterr(false);

  };

  const styles = StyleSheet.create({
    Main: {
      justifyContent: "center",
      backgroundColor: Colors.INPUT_BG,
      width: width * 0.95,
      borderRadius: 55,
      alignSelf: "center",
    },
    WhiteBG: {
      backgroundColor: Colors.WHITE,
    },
    Field: {
      width: width * 0.95,
      height: height * 0.07,
      alignSelf: "center",
      fontSize: RFValue(12),
      borderRadius: 55,
      fontFamily: "Axiforma-Regular",
      color: Colors.LABEL,
      textAlign:props.lang==='ar'?'right':'left'
    },
    NoIcon: {
      paddingLeft: width * 0.17,
    },
    IconView: {
      position: "absolute",
      height: height * 0.07,
      justifyContent: "center",
      width: width * 0.15,
      alignItems: "center",
    },
    Icon: {
      position: "absolute",
      marginLeft: width * 0.05
    },
    Phone: {
      color: Colors.MUTED,
      fontWeight: 'bold',
      fontFamily: "Axiforma-Light",
    },
    Arrow: {
      position: "absolute",
      marginLeft: width * 0.82,
      height: height * 0.06,
      width: width * 0.06,
      resizeMode: "contain",
    },
    Error: {
      borderColor: Colors.INPUT_ERROR,
      borderWidth: 1,
    },
    Verify: {
      letterSpacing: width * 0.06,
      paddingLeft: width * 0.23,
    },
    shadow: {
      shadowColor: Colors.SHADOW,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    balance: {
      paddingLeft: width * 0.3,
    },
    ChangeFont: {
      fontSize: RFValue(parseInt(props.font)),
    },
    bold: {
      fontFamily: "Axiforma-SemiBold",
    },
    BlackText: {
      color: Colors.BLACK,
    },
    pad: {
      paddingLeft: width * 0.05,
    },
    Label: {
      position: "absolute",
      alignSelf: "flex-end",
      paddingRight: width * 0.05,
      width: width * 0.2,
    },
    ActForCheck: {
      position: "absolute",
      alignSelf: "flex-end",
      paddingRight: width * 0.05,
    },
    isRight: {
      position: "absolute",
      marginLeft: width * 0.82,
      height: height * 0.06,
      width: width * 0.06,
      resizeMode: "contain",
    },
  });
  const GetIcon = (e) => {
    switch (e && e.toLowerCase()) {
      case "id":
        return (
          <FontAwesome
            name="id-card-o"
            color={Colors.LABEL}
            size={RFValue(20)}
          />
        );
      case "user":
        return (
          <FontAwesome name="user-o" color={Colors.LABEL} size={RFValue(20)} />
        );
      case "lock":
        return <Feather name="lock" color={Colors.LABEL} size={RFValue(20)} />;
      case "balance":
        return (
          <Label light muted>
            Balance
          </Label>
        );
    }
  };

  const CheckUserName = async () => {
    console.log("Config.API_URL", Config.API_URL);
    if (!ActForCheck) {

      if (val !== null && val !== "") {
        setisRight(null);
        setActForCheck(true);
        const body = JSONtoForm({
          user_name: `${val}`,
        });
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          body,
        };

        await fetch(`${Config.API_URL}/auth/username`, requestOptions)
          .then((response) => response.ok && response.json())
          .then(async (res) => {
            console.log("res user name", res);
            if (res.message == "valid username") {
              setisRight(Images.Right);
            } else {
              setisRight(Images.Wrong);
            }
            setActForCheck(false);
          })
          .catch((e) => console.log(e));
      }
    }
  };

  const onBlur = () => {
    if (props.CheckUser) {
      CheckUserName();
    }
  };

  const ViewStyle = [
    styles.Main,
    props.style,
    props.shadow && styles.shadow,
    props.white && styles.WhiteBG,
  ];

  const FieldStyle = [
    styles.Field,
    props.white && styles.BlackText,
    props.pad && styles.pad,
    !props.NoIcon && !props.verify && styles.NoIcon,
    err && styles.Error,
    props.verify && styles.Verify,

    props.font && styles.ChangeFont,
    props.Icon && props.Icon.toLowerCase() === "balance" && styles.balance,
    props.bold && styles.bold,
    props.fieldstyle,
  ];
  return (
    <>
      <View style={ViewStyle}>
        {props.phone ? (
          <>
            <CountryModal
              onChange={(e) => setCountryCode(e)}
              CountryRef={countryref}
              phone
            />
            <TouchableOpacity
              onPress={() => countryref.current(true)}
              style={[styles.IconView, { zIndex: 2 }]}
            >
              <Text style={[styles.Phone, props.numstyle]}>+{CountryCode}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.Icon}>{GetIcon(props.Icon)}</Text>
        )}
        <TextInput
          placeholderTextColor={props.white ? Colors.DARK_MUTED : Colors.WHITE} 
          onBlur={onBlur}
          {...props}
          onChangeText={HandleChange}
          style={FieldStyle}
          value={value && val === null ? value : val}
          maxLength={props.CheckUser ? 10 : null}
        />
        {props.Icon && props.Icon.toLowerCase() === "balance" && (
          <Image source={Images.RightArrow} style={styles.Arrow} />
        )}
        {props.CheckUser && !ActForCheck && isRight === null && (
          <LabelButton
            style={styles.Label}
            muted
            onPress={CheckUserName}
            Without
          >
            Check
          </LabelButton>
        )}
        {isRight !== null && <Image source={isRight} style={styles.isRight} />}
        {ActForCheck && (
          <ActivityIndicator
            size="large"
            color={Colors.WHITE}
            style={styles.ActForCheck}
          />
        )}
      </View>
      {/* {err && (
        <Label style={{ color: Colors.INPUT_ERROR }} notAlign>
          {err}
        </Label>
      )} */}
    </>
  );
});

export default InputField;
