import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from "react-native";

import RNFetchBlob from "rn-fetch-blob";

import { Colors } from "../Constants/Index";
import Label from "./Label";
import LabelButton from "./LabelButton";
import LongButton from "./LongButton";
import InputField from "./InputField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GetDate } from "../Constants/Functions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

const { width, height } = Dimensions.get("window");

const DateModal = (props) => {
  const ButtonRef = useRef();
  const [ModelState, setModelState] = useState(false);

  const [StartDatePicker, setStartDatePicker] = useState(false);
  const [EndDatePicker, setEndDatePicker] = useState(false);

  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);

  const StartProps =
    EndDate !== null
      ? { maximumDate: new Date(EndDate) }
      : { maximumDate: new Date() };

  const Min = StartDate !== null && { minimumDate: new Date(StartDate) };
  const EndProps = {
    ...Min,
    maximumDate: new Date(),
  };

  const downloadFile = async (FILE_URL) => {
    let date = new Date();

    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          "/AppRewards_Report_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ".pdf",
        description: "downloading file...",
        notification: true,
        useDownloadManager: true,
      },
    };
    const Token = await EncryptedStorage.getItem("Token");

    config(options)
      .fetch("GET", FILE_URL, {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      })
      .then((res) => {
        ButtonRef.current.SetActivity(false);
        alert("File Downloaded Successfully in Downloads folder.");
      });
  };

  const HandleClick = async () => {
    const fileUrl = `${
      Config.API_URL
    }/user/credit/statement/download/?from_date=${new Date(
      StartDate
    ).toISOString()}&to_date=${new Date(EndDate).toISOString()}`;

    ButtonRef.current.SetActivity(true, "WHITE");
    if (Platform.OS === "ios") {
      downloadFile(fileUrl);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(fileUrl);
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = setModelState;
  });

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
      <TouchableWithoutFeedback onPress={() => setModelState(!ModelState)}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          Select Date
        </Label>
        <View style={styles.ModalBody}>
          <DateTimePickerModal
            isVisible={StartDatePicker}
            mode="date"
            onConfirm={(e) => {
              setStartDate(e);
              setStartDatePicker(false);
            }}
            onCancel={() => setStartDatePicker(false)}
            {...StartProps}
          />
          <DateTimePickerModal
            isVisible={EndDatePicker}
            mode="date"
            onConfirm={(e) => {
              setEndDate(e);
              setEndDatePicker(false);
            }}
            onCancel={() => setEndDatePicker(false)}
            {...EndProps}
          />
          <View style={styles.BtnView}>
            <Label dark notAlign text="Starting date" />
            <View>
              <InputField
                style={styles.UserFieldView}
                fieldstyle={styles.SearchInput}
                NoIcon
                white
                editable={false}
                value={StartDate !== null && `${GetDate(StartDate)}`}
                placeholder={"Select"}
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
                  onPress={() => setStartDatePicker(true)}
                />
              </View>
            </View>
            <Label dark notAlign text="Ending date" style={styles.Touchable} />
            <View>
              <InputField
                style={styles.UserFieldView}
                fieldstyle={styles.SearchInput}
                NoIcon
                white
                editable={false}
                value={EndDate !== null && `${GetDate(EndDate)}`}
                placeholder={"Select"}
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
                  onPress={() => setEndDatePicker(true)}
                />
              </View>
            </View>
          </View>
          <LongButton
            style={styles.DownloadBtn}
            ref={ButtonRef}
            MutedBtn={StartDate === null || EndDate === null}
            gradient={StartDate !== null && EndDate !== null}
            text="Download"
            onPress={HandleClick}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.52,
    marginTop: height * 0.48,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.55,
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
    width: width * 0.69,
  },
  BtnView: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
  MarginDate: {
    width: width * 0.3,
  },
  DateVal: {
    width: width * 0.3,
    textAlign: "right",
  },
  Touchable: {
    marginTop: height * 0.03,
  },
  DownloadBtn: {
    marginTop: height * 0.04,
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
    marginLeft: width * 0.7,
    height: height * 0.07,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  ChangeCon: {
    zIndex: 4,
    width: width * 0.2,
  },
});

export default DateModal;
