import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";

import { Colors } from "../Constants/Index";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import NotFound from "../Components/NotFound";
import Section from "../Components/Section";
import Label from "../Components/Label";
import { wait } from "../Constants/Functions";
import SmallPopup from "../Components/SmallPopup";
import LongButton from "../Components/LongButton";

const { width, height } = Dimensions.get("window");

const TicketList = ({ navigation }) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const ModalRef = useRef();

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
        await fetch(`${Config.API_URL}/tickets/list`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            if (!isActive) return;
            setData(res);
          });
      }
    };
    check();
    return () => (isActive = false);
  });

  const GetItemStatus = (Text) => {
    switch (Text) {
      default:
        return {
          Text,
          type: "fail",
        };
      case "CLOSED":
        return {
          Text,
          type: "success",
        };
      case "OPEN":
        return {
          Text,
          type: "process",
        };
    }
  };

  const renderItem = ({ item }) => (
    <Section style={styles.Section}>
      <TouchableOpacity
        style={styles.Touchable}
        onPress={() =>
          ModalRef.current({
            state: true,
            service: item.service,
            message: item.message,
          })
        }
      >
        <>
          <Label dark bold notAlign headingtype="h5" style={styles.Service}>
            {item.service}
          </Label>
          <SmallPopup
            item={GetItemStatus(item.status.toUpperCase())}
            style={{ marginLeft: 0 }}
          />
        </>
      </TouchableOpacity>
    </Section>
  );

  const GetModal = () => {
    const [ModalState, setModalState] = useState({
      state: false,
      service: "",
      message: ",",
    });

    useEffect(() => {
      ModalRef.current = setModalState;
    });
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalState.state}
        statusBarTranslucent={false}
        onRequestClose={() =>
          setModalState({
            ...ModalState,
            state: false,
          })
        }
      >
        <TouchableWithoutFeedback
          onPress={() =>
            setModalState({
              ...ModalState,
              state: false,
            })
          }
        >
          <View style={styles.MainView} />
        </TouchableWithoutFeedback>
        <View style={styles.ModalView}>
          <View style={styles.SmallBorder} />
          <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
            Your Ticket
          </Label>
          <View style={styles.ModalBody}>
            <View style={styles.ModalInside}>
              <Label text={ModalState.service} primary bold headingtype="h2" />
              <Label
                dark
                style={styles.ModalDes}
                text={ModalState.message}
                font={13}
              />
            </View>
            <LongButton
              text="Close"
              style={styles.CloseBtn}
              shadowless
              onPress={() => setModalState({ ...ModalState, state: false })}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeArea>
      <Background height={0.18} />
      <Header heading="Your Tickets" />
      <LongButton
        text="Submit a Ticket"
        textstyle={styles.ButtonTxt}
        style={styles.Button}
        shadowless
        font={10}
        onPress={() => navigation.navigate("SubmitTicketScreen")}
      />
      <View style={styles.MainTop}>
        <GetModal />
        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <FlatList
            data={Data}
            renderItem={renderItem}
            ListEmptyComponent={<NotFound text="tickets" />}
            keyExtractor={(e) => e.id}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
            contentContainerStyle={{
              paddingBottom: height * 0.3,
            }}
          />
        )}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    marginTop: height * 0.08,
  },
  Section: {
    marginTop: height * 0.02,
  },
  Touchable: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.1,
  },
  Service: {
    marginLeft: width * 0.05,
    width: width * 0.6,
  },

  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    width: width,
    height: height * 0.71,
    alignSelf: "center",
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
    marginTop: height * 0.29,
  },
  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.61,
  },
  ModalInside: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalDes: {
    marginTop: height * 0.01,
    lineHeight: height * 0.03,
    width: width * 0.85,
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
  CloseBtn: {
    position: "absolute",
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LABEL,
    backgroundColor: Colors.INVISIBLE,
    width: width * 0.9,
    marginTop: height * 0.45,
  },
  Button: {
    position: "absolute",
    width: width * 0.33,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.INVISIBLE,
    marginTop: height * 0.12,
    alignSelf: "flex-start",
    marginLeft: width * 0.64,
  },
  ButtonTxt: { color: Colors.WHITE },
});
export default TicketList;
