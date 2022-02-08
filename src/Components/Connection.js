import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import Section from "./Section";
import Label from "./Label";
import { Colors, Images } from "../Constants/Index";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import ProfilePicture from "./ProfilePicture";
import NotFound from "./NotFound";
import LongButton from "./LongButton";
import AddConnectionModal from "./AddConnectionModal";
import LabelButton from "./LabelButton";
const { width, height } = Dimensions.get("window");

const Connection = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [Changed, setChanged] = useState({});

  const ConModalRef = React.useRef();

  const styles = StyleSheet.create({
    Section: {
      height: expanded || props.changeable ? height * 0.17 : height * 0.11,
    },
    InfoSection: {
      flexDirection: "row",
      alignItems: "center",
      height: height * 0.11,
    },
    bottomBorder: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.LESS_MUTED,
    },
    ProfilePicture: {
      marginLeft: width * 0.03,
    },
    ProfileInfo: {
      marginLeft: width * 0.02,
      justifyContent: "center",
    },
    ExpandedHead: {
      flexDirection: "row",
    },
    Expanded: {
      width: width * 0.45,
      height: height * 0.06,
      justifyContent: "center",
      alignItems: "center",
    },
    RightBorder: {
      borderRightColor: Colors.LESS_MUTED,
      borderRightWidth: 2,
    },
    change: {
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.06,
    },
    MainView: {
      height: height,
      width: width,
      position: "absolute",
      backgroundColor: Colors.BG_MUTED,
    },
    ModalView: {
      height: height * 0.8,
      marginTop: height * 0.2,
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
    Header: {
      marginTop: height * 0.03,
      flexDirection: "row",
      alignItems: "center",
    },
    ModalHead: {
      width: width * 0.72,
      marginLeft: width * 0.05,
    },
    AddCon: {
      width: width * 0.1,
    },
    ReloadIconView: {
      width: width * 0.1,
      height: width * 0.1,
      justifyContent: "center",
    },
    ReloadIcon: {
      width: width * 0.05,
      height: width * 0.05,
      marginLeft: width * 0.03,
      tintColor: Colors.PRIMARY_LABEL,
    },
    FlatList: {
      marginTop: height * 0.01,
    },
    ItemView: {
      height: height * 0.1,
      backgroundColor: Colors.WHITE,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: Colors.MUTED,
      borderBottomWidth: 1,
    },
    ReqHandleSection: {
      alignSelf: "flex-start",
      width: width * 0.8,
      height: height * 0.17,
    },
    ReqExpanded: {
      width: width * 0.4,
    },
    DeclineTxt: {
      color: Colors.LABEL_DECLINE,
    },
    Activity: {
      alignSelf: "center",
      width: width * 0.8,
    },
    OnlyChangeBtn: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const GetChange = ({ text }) => {
    const [ModelState, setModelState] = useState(false);
    const [Data, setData] = useState(null);

    useEffect(() => {
      let isActive = true;
      const check = async () => {
        if (Data === null) {
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
            `${Config.API_URL}/accepted-connections/list`,
            requestOptions
          )
            .then(async (response) => response.json())
            .then((res) => {
              if (!isActive) return;
              if (res.status && res.status.toLowerCase() === "success") {
                if (JSON.stringify(Data) !== JSON.stringify(res.data[0])) {
                  setData(res.data[0]);
                }
              } else {
                Alert.alert("Error", res.message);
              }
            });
        }
      };
      check();
      return () => (isActive = false);
    });
    const HandleChange = (e) => {
      props.changeData(e.id, e.index);
      setChanged(e);
    };
    const renderItem = ({ item, index }) => {
      const name = `${item.first_name} ${item.last_name}`;
      const user = item.user_name;
      const id = item.id;
      const Profile = item.profile_image;
      return (
        <TouchableOpacity
          onPress={() =>
            HandleChange({
              name,
              user,
              id,
              Profile,
              index,
            })
          }
        >
          <View style={styles.ItemView}>
            <ProfilePicture
              name={item.first_name.slice(0, 1) + item.last_name.slice(0, 1)}
              picture={item.profile_image}
              id={item.id}
              style={styles.ProfilePicture}
            />
            <View style={styles.ProfileInfo}>
              <Label headingtype="h5" notAlign dark bold>
                {name}
              </Label>
              <Label notAlign darkmuted font={11}>
                @{user}
              </Label>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const CustomHeight = Data
      ? Data?.length === 0
        ? 0.65
        : Data?.length > 2
        ? (Data?.length > 7 ? 0.7 : Data?.length * 0.1) + 0.15
        : 0.35
      : 0.35;

    const ModalView = [
      styles.ModalView,
      {
        height: height * CustomHeight,
        marginTop: height * (1 - CustomHeight),
      },
    ];

    return (
      <>
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
          <View style={ModalView}>
            <View style={styles.SmallBorder} />
            <View style={styles.Header}>
              <Label
                notAlign
                primary
                headingtype="h3"
                bold2
                style={styles.ModalHead}
              >
                Select Connection
              </Label>
              <AddConnectionModal ModalRef={ConModalRef} DisplayAlert />
              <LabelButton
                primary
                text="+"
                font={30}
                onPress={() => ConModalRef.current(true)}
                style={styles.AddCon}
              />
              <TouchableOpacity
                style={styles.ReloadIconView}
                onPress={() => {
                  if (Data !== null) setData(null);
                }}
              >
                <Image source={Images.Refresh} style={styles.ReloadIcon} />
              </TouchableOpacity>
            </View>

            {Data === null ? (
              <ActivityIndicator size="large" color={Colors.BLACK} />
            ) : (
              <FlatList
                style={styles.FlatList}
                data={Data}
                ListEmptyComponent={
                  <NotFound
                    text="connection"
                    con
                    desc="You don't have any connections to select."
                    ConModal
                  />
                }
                renderItem={renderItem}
                keyExtractor={(e) => e.id}
              />
            )}
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setModelState(!ModelState)}>
          <View style={styles.change}>
            <Label primary bold headingtype="h5">
              {text || "Change"}
            </Label>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const GetReqHandle = () => {
    const [Activity, setActivity] = useState(false);
    const HandleRequests = async (type) => {
      if (!Activity) {
        setActivity(true);
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        const URL =
          `${Config.API_URL}/` +
          (type === 0
            ? `accept/connection-request/`
            : `cancel/connection-request/`) +
          props.id;
        await fetch(URL, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (res.status && res.status.toLowerCase() === "success") {
              if (props.HandleChange) props.HandleChange();
            } else {
              Alert.alert("Error", res.message);
            }
          });
      }
    };

    return (
      <View style={styles.ExpandedHead}>
        {Activity === true ? (
          <View style={styles.Activity}>
            <ActivityIndicator size="large" color={Colors.BLACK} />
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={() => HandleRequests(0)}>
              <View
                style={[
                  styles.Expanded,
                  styles.RightBorder,
                  styles.ReqExpanded,
                ]}
              >
                <Label primary font={13} medium>
                  Accept
                </Label>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => HandleRequests(1)}>
              <View style={[styles.Expanded, styles.ReqExpanded]}>
                <Label primary font={13} medium style={styles.DeclineTxt}>
                  Decline
                </Label>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const GetSection = () => {
    const Profile =
      Changed.name === undefined ? props.Profile : Changed.Profile;
    const name = Changed.name || props.name;
    return props.OnlyChangeBtn ? (
      <Section style={[styles.OnlyChangeBtn, props.style]}>
        {props.changeable && <GetChange text="Select Connection" />}
      </Section>
    ) : (
      <>
        <Section
          style={[
            styles.Section,
            props.ReqHandle && styles.ReqHandleSection,
            props.style,
          ]}
        >
          <View
            style={[
              styles.InfoSection,
              (expanded || props.changeable || props.ReqHandle) &&
                styles.bottomBorder,
            ]}
          >
            <ProfilePicture
              name={name.split(" ").reduce((p, n) => p + n.slice(0, 1), "")}
              picture={Profile}
              id={props.id}
              style={styles.ProfilePicture}
            />
            <View style={styles.ProfileInfo}>
              <Label headingtype="h5" notAlign dark bold>
                {name || "Robert P. Huckins"}
              </Label>
              <Label notAlign darkmuted font={11}>
                @{Changed.user || props.user || "robert_phuckins"}
              </Label>
            </View>
          </View>
          {expanded && (
            <>
              <View style={styles.ExpandedHead}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("TransferCoins", {
                      con_user: Changed.user || props.user,
                    })
                  }
                >
                  <View style={[styles.Expanded, styles.RightBorder]}>
                    <Label primary font={13} medium>
                      Transfer
                    </Label>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("RequestCoins", {
                      con_user: props.user,
                    })
                  }
                >
                  <View style={styles.Expanded}>
                    <Label primary font={13} medium>
                      Request
                    </Label>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
          {props.changeable && <GetChange />}
          {props.ReqHandle && <GetReqHandle />}
        </Section>
      </>
    );
  };

  const HandleClick = (e) => setExpanded(!expanded);

  return props.Button ? (
    <TouchableWithoutFeedback onPress={HandleClick}>
      <View>
        <GetSection />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <GetSection />
  );
};

export default Connection;
