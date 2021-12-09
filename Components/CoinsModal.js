import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { GetCoins } from "../Constants/Functions";
import { Colors, Images } from "../Constants/Index";
import Label from "./Label";
import LongButton from "./LongButton";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const RadioBtn = (props) => {
  return (
    <Image
      source={props.Selected ? Images.RadioSelected : Images.RadioDisabled}
      style={styles.RadioBtn}
    />
  );
};

const CoinsModal = (props) => {
  const [ModelState, setModelState] = useState({
    state: false,
    selected: 0,
  });
  const Coins = useSelector((state) => state.Coins);

  const HandleChange = (state, selected = 0) => {
    const data = { state, selected };
    if (JSON.stringify(data) !== JSON.stringify(ModelState))
      setModelState(data);
  };

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const AddBtn = ({ id, name, border, cointype }) => (
    <TouchableOpacity
      style={[styles.CoinView, border && styles.TopBorder]}
      onPress={() => HandleChange(true, id)}
    >
      <RadioBtn Selected={ModelState.selected === id} />
      <View>
        <Label
          notAlign
          dark
          headingtype="h3"
          style={styles.CoinLabel}
          text={name}
        />

        {props.BuyProduct &&
          (+Coins.Balance[cointype] - +props.BuyProduct < 0 ? (
            <Label notAlign dark bold style={styles.CoinLabel}>
              Not enough balance
            </Label>
          ) : (
            <Label notAlign dark light style={styles.CoinLabel}>
              Remaining Balance:{" "}
              <Label
                bold
                dark
                text={`${+Coins.Balance[cointype] - +props.BuyProduct}`}
              />
            </Label>
          ))}
      </View>
      <Image source={Images[name]} style={styles.CoinIcon} />
    </TouchableOpacity>
  );

  const ApproveType = () => {
    if (
      props.BuyProduct !== undefined &&
      GetCoins(Coins, ModelState.selected)[1] - +props.BuyProduct < 0
    )
      return Alert.alert("Error", "You do not have enough coins.");
    if (props.onApprove) props.onApprove(ModelState.selected);
    setModelState({ state: false, selected: 0 });
  };

  const CloseModal = () => {
    setModelState({
      ...ModelState,
      state: !ModelState.state,
    });
    if (props.onClose) props.onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        CloseModal();
      }}
    >
      <TouchableWithoutFeedback onPress={() => CloseModal()}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          {props.BuyProduct !== undefined
            ? "Which coin type you want to use to buy?"
            : "Select your coin type"}
        </Label>
        <View style={styles.ModalBody}>
          {/* <AddBtn name="Silver" id={0} cointype="Silver Coins" /> */}
          <AddBtn name="Gold" id={0} border cointype="Gold Coins" />
          <AddBtn name="Gold Credit" id={1} border cointype="Gold Credit" />
          {/* <AddBtn name="Diamond" id={1} border cointype="Diamond Coins" /> */}
          <LongButton
            gradient
            text={props.BuyProduct ? "Select Delivery Address" : "Select"}
            onPress={ApproveType}
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
    height: height * 0.45,
    marginTop: height * 0.55,
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

  CoinView: {
    flexDirection: "row",
    height: height * 0.1,
    alignItems: "center",
  },
  TopBorder: {
    borderTopColor: Colors.MUTED,
    borderTopWidth: 2,
  },
  CoinLabel: {
    marginLeft: width * 0.05,
    width: width * 0.6,
  },
  CoinIcon: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: "contain",
  },

  RadioBtn: {
    width: width * 0.08,
    height: height * 0.04,
    resizeMode: "contain",
    marginLeft: width * 0.1,
  },
});

export default CoinsModal;
