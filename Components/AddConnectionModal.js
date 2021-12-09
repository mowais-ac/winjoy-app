import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import LongButton from "./LongButton";
import InputField from "./InputField";
import Label from "./Label";

import { Colors, Images } from "../Constants/Index";
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import ProfilePicture from "./ProfilePicture";

const { width, height } = Dimensions.get("window");

const AddConnectionModal = (props) => {
  const { ModalRef } = props;
  const [ModelState, setModelState] = useState(false);
  const [Searched, setSearched] = useState(null);
  const [AddBtn, setAddBtn] = useState(false);

  const SearchVal = useRef();
  const ButtonRef = useRef();
  useEffect(() => {
    ModalRef.current = setModelState;
  });

  const SearchData = async () => {
    const text = SearchVal.current.getText();
    if (text && text !== "" && !ButtonRef.current.GetActivity() && !AddBtn) {
      ButtonRef.current.SetActivity(true);
      const Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      };
      var Result;
      await fetch(
        `${Config.API_URL}/connections/search?user_name=${text}`,
        requestOptions
      )
        .then(async (response) => response.json())
        .then((res) => {
          if (res.status && res.status.toLowerCase() === "success") {
            const {
              id,
              first_name,
              last_name,
              user_name,
              profile_image,
            } = res.data[0];
            Result = {
              id,
              first_name,
              last_name,
              user_name,
              profile_image,
              added: 0,
            };
          } else {
            Result = "error";
          }
        });
      if (Result === "error") setSearched("error");
      else {
        await fetch(
          `${Config.API_URL}/connected/with/${Result.id}`,
          requestOptions
        )
          .then(async (response) => response.json())
          .then((res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              Result.added = 1;
            } else {
              Result.added = 0;
            }
          });
        if (Result.added === 0) {
          await fetch(
            `${Config.API_URL}/connection-request/sent/to/${Result.id}`,
            requestOptions
          )
            .then(async (response) => response.json())
            .then((res) => {
              if (res.status && res.status.toLowerCase() === "success") {
                Result.added = 2;
              } else {
                Result.added = 0;
              }
            });
        }
        if (Result.added === 0) {
          await fetch(
            `${Config.API_URL}/connection-request/from/${Result.id}`,
            requestOptions
          )
            .then(async (response) => response.json())
            .then((res) => {
              if (res.status && res.status.toLowerCase() === "success") {
                Result.added = 3;
              } else {
                Result.added = 0;
              }
            });
        }
        setSearched(Result);
      }
    }
  };

  const SendRequest = async () => {
    setAddBtn(true);
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };

    await fetch(
      `${Config.API_URL}/send/connection-request/${Searched.id}`,
      requestOptions
    )
      .then(async (response) => response.json())
      .then((res) => {
        if (res.status && res.status.toLowerCase() === "success") {
          setAddBtn(false);
          setSearched({ ...Searched, added: 2 });
          if (props.DisplayAlert)
            Alert.alert(
              "Success",
              "Request sent, please ask the other user to accept your request."
            );
        } else {
          Alert.alert("Error", res.message);
        }
      });
  };

  const GetSearchBtn = (props) => {
    const [Activity, SetActivity] = useState(false);
    useEffect(() => {
      if (props.ButtonRef)
        props.ButtonRef.current = {
          GetActivity: () => Activity,
          SetActivity,
        };
    });
    return Activity ? (
      <View style={styles.SearchUser}>
        <ActivityIndicator
          size="large"
          color={Colors.BLACK}
          style={styles.SearchUserImg}
        />
      </View>
    ) : (
      <TouchableOpacity style={styles.SearchUser} onPress={SearchData}>
        <Image
          source={Images.Search}
          style={styles.SearchUserImg}
          tintColor={AddBtn ? Colors.MUTED : Colors.BLACK}
        />
      </TouchableOpacity>
    );
  };

  const GetAddText = (t) => {
    switch (t) {
      default:
        return "Add";
      case 1:
        return "Added";
      case 2:
        return "Sent";
      case 3:
        return "Received";
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState}
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModelState(!ModelState);
      }}
    >
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={() => setModelState(!ModelState)}>
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder2} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Add Connection
          </Label>
          <View style={styles.ModalBody}>
            <View style={styles.InputView}>
              <InputField
                style={styles.UserFieldView}
                fieldstyle={[styles.UserField, styles.SearchInput]}
                NoIcon
                placeholder="Enter username"
                autoCapitalize="none"
                placeholderTextColor={Colors.DARK_MUTED}
                ref={SearchVal}
              />
              <GetSearchBtn ButtonRef={ButtonRef} />
            </View>
            <View style={styles.ItemView}>
              {Searched ? (
                Searched === "error" ? (
                  <Label dark headingtype="h5" style={{ width: width }}>
                    No result found
                  </Label>
                ) : (
                  <>
                    <ProfilePicture
                      picture={Searched.profile_image}
                      style={styles.ProfilePicture}
                      id={Searched.id}
                      name={
                        Searched.first_name.slice(0, 1) +
                        Searched.last_name.slice(0, 1)
                      }
                    />
                    <View style={styles.ProfileInfo}>
                      <Label headingtype="h5" notAlign dark bold>
                        {`${Searched.first_name} ${Searched.last_name}`}
                      </Label>
                      <Label notAlign darkmuted font={11}>
                        @{Searched.user_name}
                      </Label>
                    </View>
                    {AddBtn ? (
                      <ActivityIndicator
                        style={styles.AddCon}
                        size="large"
                        color={Colors.BLACK}
                      />
                    ) : (
                      <LongButton
                        text={GetAddText(Searched.added)}
                        style={[
                          styles.AddCon,
                          Searched.added === 0 && styles.AddConBG,
                        ]}
                        MutedBtn={Searched.added !== 0}
                        white
                        shadowless
                        font={Searched.added === 3 ? 12 : 13}
                        onPress={() => {
                          if (Searched.added === 0) SendRequest();
                        }}
                      />
                    )}
                  </>
                )
              ) : (
                <Label dark headingtype="h5" style={{ width: width }}>
                  Enter username to search
                </Label>
              )}
            </View>

            <LongButton
              style={styles.CloseBtn}
              MutedBtn
              text="Close"
              onPress={() => setModelState(!ModelState)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  SearchInput: {
    paddingLeft: width * 0.1,
  },
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  MainModelView: {
    flex: 1,
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.45,
    marginTop: height * 0.55,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.45,
  },
  SmallBorder2: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.03,
  },
  InputView: {
    marginTop: height * 0.02,
  },
  UserFieldView: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.MUTED,
  },
  UserField: {
    color: Colors.BLACK,
  },

  CloseBtn: {
    marginTop: height * 0.02,
    borderColor: Colors.DARK_MUTED,
    borderWidth: 1.4,
  },
  SearchUser: {
    position: "absolute",
    marginLeft: width * 0.82,
    marginTop: height * 0.016,
  },
  SearchUserImg: {
    width: width * 0.08,
    height: height * 0.04,
    resizeMode: "contain",
  },
  ItemView: {
    marginTop: height * 0.02,
    height: height * 0.1,
    backgroundColor: Colors.BENEFICIARY,
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
  AddCon: {
    position: "absolute",
    width: width * 0.25,
    height: height * 0.05,
    marginLeft: width * 0.7,
  },
  AddConBG: {
    backgroundColor: Colors.BUTTON_LABEL,
  },
});

export default AddConnectionModal;
