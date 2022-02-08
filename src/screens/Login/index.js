import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AuthContext } from "../../Components/context";
import Background from "../../Components/Background";
import InputField from "../../Components/InputField";
import InputFieldWithModal from "../../Components/InputFieldWithModal";
import Label from "../../Components/Label";
import LabelButton from "../../Components/LabelButton";
import LongButton from "../../Components/LongButton";
import SmallButton from "../../Components/SmallButton";
import { useDispatch } from 'react-redux';
import { Images } from "../../Constants/Index";
import types from '../../redux/types';
import {
  JSONtoForm,
  IsVerified,
  IsSuspended,
  GetUserDeviceDetails,
} from "../../Constants/Functions";
import { useTranslation } from 'react-i18next';
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import Modals from "../../Components/Modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { signIn } = React.useContext(AuthContext);
  const emailref = useRef();
  const passref = useRef();
  const ButtonRef = useRef();
  const ModalState = useRef();

  useEffect(() => {

  }, []);
  const HandleLogin = async () => {
    if (
      emailref.current.validatePhone() &&
      passref.current.ValidatePass() &&
      !ButtonRef.current.GetActivity()
    ) {
      const phone_no = emailref.current.getText();
      const password = passref.current.getText();

      if ([phone_no, password].filter((e) => e == null || e == "")?.length >= 1)
        return;
      ButtonRef.current.SetActivity(true);
      const body = JSONtoForm({
        phone_no: `+${phone_no}`,
        password,
        ...(await GetUserDeviceDetails()),
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
        body,
      };

      await fetch(`${Config.API_URL}/auth/login`, requestOptions)
        .then(async (response) => response.json())
        .then(async (res) => {
          ButtonRef.current.SetActivity(false);
          if (res?.data?.token) {
            dispatch({
              type: types.USER_DATA,
              userData: res?.data?.user,
              //  user: res.data.data,
            });
            await EncryptedStorage.setItem("Token", res.data.token);
            signIn(res.data.token)
            // navigation.replace("HomeStack");
            if (await IsSuspended(res.data.token))
              return ModalState.current(true, {
                heading: "Account suspended",
                Error:
                  "Your account has been inactive/suspended. Please contact support for further details.",
              });
            if (await IsVerified(res.data.token)) {
              await EncryptedStorage.setItem("Token", res.data.token);
              signIn(res.data.token)
              //  navigation.replace("HomeStack");
            }
            else {
              dispatch({
                type: types.USER_DATA,
                userData: res?.data?.user, 
                //  user: res.data.data,
              });
              navigation.replace("Verify", { phone: phone_no, token: res.data.token });
            }
          }
          else if (
            res.message === "Enter 6 Digit Code which sent on your mobile"
          ) {
            await EncryptedStorage.setItem("Token", res.data.token);
            navigation.replace("Verify", { phone: phone_no });
          }
          else if (
            res.message ===
            "Your account has been inactive/suspended by our admin, please contact support for further details"
          )
            ModalState.current(true, {
              heading: "Account suspended",
              Error: res.message,
            });
          else {
            ModalState.current(true, {
              heading: "Error",
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
            ButtonRef.current.SetActivity(false);
          }
        })
        .catch((e) => {
          Alert.alert("Error", e);
          ButtonRef.current.SetActivity(false);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.MainTop}>
          <Background height={1} design />
          <Image source={Images.Logo} style={styles.Logo} />
          <Label bold2 headingtype="h2" style={[styles.MarginLarge]}>
            {t("login_heading")}
          </Label>
          <Modals ModalRef={ModalState} Error />
          <InputFieldWithModal
            style={styles.MarginLarge}
            placeholder={t("phone_number")}
            ref={emailref}
            keyboardType="number-pad"
            phone
          />
          {/* <InputField
            style={styles.MarginLarge}
            ref={emailref}
            placeholder="Phone number"
            Icon="user"
            maxLength={9}
            keyboardType="number-pad"
          /> */}
          <InputField
            style={styles.MarginSmall}
            ref={passref}
            placeholder={t("password")}
            secureTextEntry={true}
            Icon="lock"
          //  lang={lang}
          />
          <LongButton
            style={styles.MarginSmall}
            text={t("login")}
            onPress={HandleLogin}
            ref={ButtonRef}
            textstyle={{ color: '#fff', }}
          />
          <LabelButton
            style={styles.MarginSmall}
            Notdark
            text={t("forgot_password")}
            onPress={() => navigation.navigate("ForgotPassword")}

          />
        </View>
        {/* <SmallButton style={styles.ORButton} text="OR" /> */}
        <Label
          bold
          muted
          style={[styles.ORButton, { lineHeight: height * 0.03, top: 10 }]}
          font={15}
        >
          {t("or")}
        </Label>
        <View style={{ marginTop: height * 0.052 }}>
          <LongButton
            text={t("create_account")}
            onPress={() => navigation.navigate("Register")}
            textstyle={{ color: '#fff' }}
          />
          {/* <LongButton
            style={styles.MarginMed}
            text="Sign in with Google"
            black
            Icon="google"
          /> */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.7,
    alignItems: "center",
  },
  Logo: {
    marginTop: height * 0.12,
    width: width * 0.2,
    height: height * 0.12,
    resizeMode: "contain",
  },
  MarginLarge: {
    marginTop: height * 0.037,
  },
  Margin: { marginTop: height * 0.027 },
  MarginMed: { marginTop: height * 0.022 },
  MarginSmall: { marginTop: height * 0.015 },
  ORButton: {
    position: "absolute",
    marginTop: height * 0.68,
  },
});

export default index;