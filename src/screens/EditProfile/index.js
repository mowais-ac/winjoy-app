import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import Background from "../../Components/Background";
import SafeArea from "../../Components/SafeArea";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import InputField from "../../Components/InputField";
import Header from "../../Components/Header";

import { Colors } from "../../Constants/Index";
import UserInfo from "../../Components/UserInfo";
import EncryptedStorage from "react-native-encrypted-storage";
import { JSONtoForm } from "../../Constants/Functions";
import Config from "react-native-config";
import ImagePicker from "react-native-image-crop-picker";
import LabelButton from "../../Components/LabelButton";
import CountryModal from "../../Components/CountryModal";
import ValidateModal from "../../Components/ValidateModal";
import GoBack from "../../Components/GoBack";
import { useDispatch, useSelector } from "react-redux";
import types from "../../redux/types";
const { width, height } = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const ReceivedType = route.params && route.params.ReceivedType;
  const [EditType, setEditType] = useState(ReceivedType || 0);
  const [OldUser, setOldUser] = useState(null);
  const userData = useSelector(state => state.app.userData);
  useEffect(() => {
    let isActive = true;
    const check = async () => {
      if (OldUser === null && isActive) {
        setOldUser(userData);
      }
    };
    check();
    return () => (isActive = false);
  });
  const ButtonRef = useRef();

  // personal
  const fname = useRef();
  const lname = useRef();
  const uname = useRef();
  const emailref = useRef();
  const countryref = useRef();
  const cityref = useRef();
  const addressref = useRef();
  const pictureref = useRef();
  const phone_noref = useRef();

  //career
  const dref = useRef();
  const companyref = useRef();
  const oaddressref = useRef();
  const ophoneref = useRef();

  //Settings
  const oldpref = useRef();
  const newpref = useRef();
  const conpref = useRef();

  const ValidateRef = useRef();

  const HandleClick = (e) => {
    if (!ButtonRef.current.GetActivity())
      switch (EditType) {
        case 0:
          return HandlePersonal();
        case 1:
          return HandleCareer();
        case 2:
          return HandleSettings();
      }
  };

  const HandlePersonal = async () => {
    const first_name = fname.current.getText();
    const last_name = lname.current.getText();
    const user_name = uname.current.getText();
    const email = emailref.current.getText();
    const country = countryref.current;
    const city = cityref.current.getText();
    const address = addressref.current.getText();

    var JSONBody = {
      first_name,
      last_name,
      user_name,
      email,
      country,
      city,
      address,
    };
    PerformApiFunc(JSONBody);
    if (pictureref.current !== null) {

      const Token = await EncryptedStorage.getItem("Token");
      const body = JSONtoForm({
        profile_image: `data:${pictureref?.current?.mime};base64, ${pictureref?.current?.data}`,
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      await fetch(`${Config.API_URL}/update/user/profile-image`, requestOptions)
        .then(async (response) => response.json())
        .then(async (res) => {
          if (!res.status || res.status.toLowerCase() !== "success")
            Alert.alert("Error", "Profile image not updating");
          else {
            dispatch({
              type: types.USER_DATA,
              userData: res?.user,
              //  user: res.data.data,
            });
          }
        });
    }
  };

  const HandleCareer = async () => {
    const designation = dref.current.getText();
    const company_name = companyref.current.getText();
    const office_address = oaddressref.current.getText();
    const office_no = ophoneref.current.getText();

    var JSONBody = {
      designation,
      company_name,
      office_address,
      office_no,
    };
    PerformApiFunc(JSONBody, 1);
  };

  const HandleSettings = async () => {
    if (
      oldpref.current.ValidatePass() &&
      newpref.current.ValidatePass() &&
      conpref.current.ValidatePass()
    ) {
      const current_password = oldpref.current.getText();
      const password = newpref.current.getText();
      const password_confirmation = conpref.current.getText();

      const Token = await EncryptedStorage.getItem("Token");
      const body = JSONtoForm({
        current_password,
        password,
        password_confirmation,
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      ButtonRef.current.SetActivity(true);
      await fetch(`${Config.API_URL}/user/password-change`, requestOptions)
        .then(async (response) => response.json())
        .then(async (res) => {
          if (res.status && res.status.toLowerCase() === "success") {
            Alert.alert("Success", res.message);
            navigation.reset({
              index: 0,
              routes: [{ name: "BottomTabStack" }],
            });
          } else Alert.alert("Error", res.message);
          ButtonRef.current.SetActivity(false);
        });
    }
  };

  const PerformApiFunc = async (JSONBody, val = 0) => {
    var CleanedBody = {};
    for (var i in JSONBody) {
      if (JSONBody[i] !== null && JSONBody[i] !== "") {
        CleanedBody[i] = JSONBody[i];
      }
    }
    const Token = await EncryptedStorage.getItem("Token");

    const body = JSONtoForm({
      ...OldUser,
      ...CleanedBody,
    });
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    ButtonRef.current.SetActivity(true);

    const URL =
      Config.API_URL +
      (val === 0 ? `/update/personal-details` : `/update/career-details`);
    await fetch(URL, {
      ...requestOptions,
      method: "POST",
      body,
    })
      .then(async (response) => response.json())
      .then(async (res) => {
        if (res.status === 'Success') {
          dispatch({
            type: types.USER_DATA,
            userData: res?.user,
            //  user: res.data.data,
          });
          alert(res.message)


          ButtonRef.current.SetActivity(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "MenuStack" }],
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error", "An error occured, try again");
        ButtonRef.current.SetActivity(false);
      });
  };

  const GetField = React.forwardRef((props, ref) => {
    const { name, value, style } = props;
    return (
      <View style={[styles.InputView, style]}>
        <Label notAlign darkmuted>
          {name}
        </Label>
        <InputField
          NoIcon
          placeholder={name}
          {...props}
          white
          pad
          shadow
          value={value}
          style={style}
          fieldstyle={[styles.FieldHeight, style]}
          ref={ref}
        />
      </View>
    );
  });

  const HandleBtnClick = (e) => {
    if (EditType !== e) return setEditType(e);
  };
  const GetButton = (props) => {
    return (
      <LongButton
        text={props.text}
        font={props.font || 12}
        regular
        black={EditType !== props.val}
        white={EditType === props.val}
        shadowless
        style={[
          styles.TopButton,
          EditType === props.val && styles.SelectedBtn,
          !props.noMargin && styles.BtnMargin,
        ]}
        onPress={() => HandleBtnClick(props.val)}
      />
    );
  };

  const GetData = () => {
    return (
      <>
        <View style={styles.TopButtonsView}>
          <GetButton text="Personal Detail" val={0} font={11} noMargin />
          <GetButton text="Career Detail" val={1} />
          <GetButton text="Settings" val={2} />
        </View>

        {EditType === 0 ? (
          <Personal />
        ) : EditType === 1 ? (
          <Career />
        ) : (
          <Settings />
        )}
        <LongButton
          text="Submit"
          style={styles.Margin}
          gradient
          onPress={HandleClick}
          ref={ButtonRef}
        />
        <GoBack style={styles.MarginLess} />
      </>
    );
  };

  const Personal = () => {
    const GetProfilePic = () => {
      const [Picture, setPicture] = useState(null);

      useEffect(() => {
        pictureref.current = Picture;
      });

      return (
        <>
          <View style={styles.PictureView}>
            {Picture && (
              <Image
                source={{
                  uri: `data:${Picture.mime};base64,${Picture.data}`,
                }}
                style={styles.PictureImg}
              />
            )}
            <LongButton
              light
              text="Change profile picture"
              onPress={() =>
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true,
                  includeBase64: true,
                })
                  .then((image) => {
                    setPicture(image);
                  })
                  .catch((e) => setPicture(null))
              }
              style={Picture && styles.PictureBtn}
            />
          </View>
        </>
      );
    };

    const GetCountrySection = () => {
      const CountryModalRef = useRef();

      const [CountryValue, setCountryValue] = useState(
        OldUser.country === "null" ? "N/A" : OldUser.country
      );

      useEffect(() => {
        countryref.current = CountryValue;
      });

      return (
        <>
          <CountryModal
            CountryRef={CountryModalRef}
            onChange={(e) => setCountryValue(e)}
          />
          <InputField
            style={styles.UserFieldView}
            fieldstyle={styles.SearchInput}
            NoIcon
            white
            editable={false}
            value={CountryValue}
            placeholder={"Select Country"}
            placeholderTextColor={Colors.DARK_MUTED}
          />
          <View style={styles.ChangeConView}>
            <LabelButton
              notAlign
              primary
              bold
              text="Change"
              headingtype="h5"
              style={styles.ChangeCon}
              onPress={() => CountryModalRef.current(true)}
            />
          </View>
        </>
      );
    };

    return (
      <>
        <View style={styles.PersonalBtnView}>
          <GetField
            name="First Name"
            style={styles.PersonalBtn}
            ref={fname}
            value={userData?.first_name}
          />
          <GetField
            name="Last Name"
            style={styles.PersonalBtn}
            ref={lname}
            value={userData?.last_name}
          />
        </View>
        <GetField
          name="Username"
          ref={uname}
          autoCapitalize="none"
          editable={false}
          value={userData?.user_name}
        />
        <ValidateModal
          ModalRef={ValidateRef}
          onComplete={() => navigation.navigate("Splash")}
        />
        <TouchableOpacity onPress={() => ValidateRef.current(true, true)}>
          <GetField
            name="Email"
            ref={emailref}
            value={userData?.email}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ValidateRef.current(true, false)}>
          <GetField
            name="Phone Number"
            ref={phone_noref}
            value={userData?.phone_no}
            editable={false}
          />
        </TouchableOpacity>
        <View style={styles.InputView}>
          <Label notAlign darkmuted text="Country" />
          <GetCountrySection />
        </View>
        <GetField
          name="City"
          ref={cityref}
          value={userData?.city === "null" ? "N/A" : userData?.city}
        />
        <GetField
          name="Address"
          ref={addressref}
          value={userData?.address === "null" ? "N/A" : userData?.address}
        />
        <GetProfilePic />
      </>
    );
  };
  const Career = () => {
    return (
      <>
        <GetField name="Designation" ref={dref} value={userData?.designation} />
        <GetField
          name="Company"
          ref={companyref}
          value={userData?.company_name}
        />
        <GetField
          name="Office address"
          ref={oaddressref}
          value={userData?.office_address}
        />
        <GetField
          name="Office phone"
          ref={ophoneref}
          value={userData?.office_no}
        />
      </>
    );
  };

  const Settings = () => {
    return (
      <>
        <GetField name="Old Password" ref={oldpref} secureTextEntry />
        <GetField name="New Password" ref={newpref} secureTextEntry />
        <GetField name="Confirm Password" ref={conpref} secureTextEntry />
      </>
    );
  };

  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.15} />
        <Header value={3} />
        <View style={styles.MainTop}>
          {userData !== null && (
            <UserInfo style={styles.header} OwnUser popup status />
          )}
        </View>
        {OldUser && <GetData />}

        <View style={styles.Margin} />
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.165,
  },
  header: {
    flexDirection: "row",
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  TopButtonsView: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  TopButton: {
    width: width * 0.3,
    height: height * 0.06,
  },
  SelectedBtn: {
    backgroundColor: Colors.BUTTON_LABEL,
  },
  InputView: {
    marginTop: height * 0.02,
    width: width * 0.95,
    alignSelf: "center",
  },
  FieldHeight: {
    height: height * 0.06,
  },
  PersonalBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.95,
    alignSelf: "center",
  },
  PersonalBtn: {
    width: width * 0.45,
  },
  BtnMargin: {
    marginLeft: width * 0.03,
  },
  Margin: {
    marginTop: height * 0.02,
  },
  PictureView: {
    flexDirection: "row",
    marginTop: height * 0.02,
    marginLeft: width * 0.025,
  },
  PictureImg: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
  },
  PictureBtn: {
    width: width * 0.7,
    marginLeft: width * 0.05,
  },
  UserFieldView: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.MUTED,
  },
  SearchInput: {
    paddingLeft: width * 0.08,
  },

  ChangeConView: {
    position: "absolute",
    width: width * 0.2,
    paddingRight: width * 0.05,
    marginTop: height * 0.025,
    height: height * 0.07,
    zIndex: 3,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  ChangeCon: {
    zIndex: 4,
  },
  MarginLess: {
    marginTop: height * 0.01,
  },
});
export default index;