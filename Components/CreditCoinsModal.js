import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import { GetDate, wait } from "../Constants/Functions";

import { Colors } from "../Constants/Index";
import Label from "./Label";
import NotFound from "./NotFound";

const { width, height } = Dimensions.get("window");

const CreditCoinsModal = (props) => {
  const [ModalState, setModalState] = useState(false);

  const [Data, setData] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

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
        await fetch(`${Config.API_URL}/credit/transaction/list`, requestOptions)
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

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = setModalState;
  });

  const CloseModal = () => {
    setModalState(!ModalState);
    if (props.onClose) props.onClose();
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.ItemBtn}
        onPress={() => {
          if (props.onSelect) props.onSelect(item.transaction_id);
          CloseModal();
        }}
      >
        <View style={styles.ItemView}>
          <Label
            dark
            notAlign
            bold2
            headingtype="h4"
            text={`${+item.balance} coins`}
            style={styles.CoinLabel}
          />
          <Label darkmuted text={`${GetDate(item.start_date)}`} notAlign />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModalState}
      statusBarTranslucent={false}
      onRequestClose={() => CloseModal()}
    >
      <TouchableWithoutFeedback onPress={() => CloseModal()}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          Select Transaction
        </Label>
        <View style={styles.ModalBody}>
          {Data === null ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <FlatList
              data={Data}
              renderItem={renderItem}
              ListEmptyComponent={
                <NotFound
                  text="transactions"
                  desc={`You don't have any transactions`}
                  NoSupport
                  style={styles.NotFound}
                />
              }
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              keyExtractor={(e) => e.id}
              contentContainerStyle={{
                paddingBottom: height * 0.17,
              }}
            />
          )}
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
  NotFound: {
    marginTop: height * 0.05,
  },
  CoinLabel: { width: width * 0.6 },
  ItemBtn: {
    width: width,
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 2,
    height: height * 0.1,
    alignItems: "center",
  },
  ItemView: {
    width: width * 0.8,
    height: height * 0.1,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreditCoinsModal;
