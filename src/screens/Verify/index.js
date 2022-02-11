import React, { useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import Background from "../../Components/Background";
import InputField from "../../Components/InputField";
import Label from "../../Components/Label";
import LabelButton from "../../Components/LabelButton";
import LongButton from "../../Components/LongButton";
import { AuthContext } from "../../Components/context";
import { GetUserDeviceDetails, JSONtoForm } from "../../Constants/Functions";
import Config from "react-native-config";
import types from '../../redux/types';
import { Colors, Images } from "../../Constants/Index";
import GoBack from "../../Components/GoBack";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const email = route.params && route.params.email;
  const phone = route.params && route.params.phone;
  const token = route.params && route.params.token;
  const evref = useRef();
  const phvref = useRef();
  const ButtonRef = useRef();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const HandleClick = async () => {
    if (evref.current.validateVerify() && !ButtonRef.current.GetActivity()) {
      // phvref.current.validateVerify();

      ButtonRef.current.SetActivity(true);
      const body = JSONtoForm({
        two_factor_code: evref.current.getText(),
        ...(await GetUserDeviceDetails()),
      });
      var Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };

      await fetch(`${Config.API_URL}/verify/otp`, requestOptions)
        .then(async (response) => response.json())
        .then(async (res) => {
          console.log("res", res);
          if (res.message && res.message === "Congrats!! Account verified") {
            dispatch({
              type: types.USER_DATA,
              userData: res?.user,
            });
            dispatch2({
              type: types.TOTAL_LIVES,
              totalLives: 0,
            }); 
          //  return navigation.replace("Splash");
            signIn(token)
          } else {
            Alert.alert("Error", res.message);
            ButtonRef.current.SetActivity(false);
          }
        })
        .catch((e) => {
          console.log(e);
          ButtonRef.current.SetActivity(false);
        });
    }
  };
  return (
    <SafeAreaView>
      <Background height={1} resize="stretch" design />
      <ScrollView>
        <View style={styles.MainTop}>
        <GoBack />
          <Image source={Images.Logo} style={styles.Logo} />
          <Label bold headingtype="h1" style={styles.Heading}>
            Verify account
          </Label>
          <Label light style={[styles.Margin, { lineHeight: height * 0.03 }]}>
            Enter the 6 digit code which sent to{" "}
            <Label light underline>
              {email || "test@domain.com"}
            </Label>{" "}
            and{" "}
            <Label light underline>
              +{phone || "9715556232947"}
            </Label>
          </Label>

          <Label style={styles.Margin2}>Email Verification</Label>
          <InputField
            style={styles.MarginField}
            fieldstyle={styles.Text}
            placeholder="******"
            maxLength={6}
            ref={evref}
            verify
            keyboardType="numeric"
            placeholderTextColor={Colors.MUTED}
          />
          {/* <Label style={styles.Margin3}>Phone verification</Label>
          <InputField
            style={styles.MarginField}
            fieldstyle={styles.Text}
            placeholder="******"
            keyboardType="numeric"
            maxLength={6}
            ref={phvref}
            verify
            placeholderTextColor={Colors.MUTED}
          /> */}
          <LongButton
            style={styles.Margin3}
            text="Verify"
            onPress={HandleClick}
            ref={ButtonRef}
            textstyle={{ color: '#fff' }}
          />
        </View>
        <View>
          <GoBack
            onPress={() => navigation.replace("Splash")}
            style={styles.Margin3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.905,
    alignItems: "center",
  },

  Logo: {
    marginTop: height * 0.15,
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
  },
  Heading: { marginTop: height * 0.015 },
  Text: { color: Colors.LABEL },
  Margin: { marginTop: height * 0.023 },
  Margin2: { marginTop: height * 0.04 },
  Margin3: { marginTop: height * 0.03 },

  MarginField: { marginTop: height * 0.01 },
});

export default index;
