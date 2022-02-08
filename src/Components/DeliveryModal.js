import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Colors } from "../Constants/Index";
import InputField from "./InputField";
import CountryModal from "./CountryModal";
import Label from "./Label";
import LabelButton from "./LabelButton";
import LongButton from "./LongButton";

const { width, height } = Dimensions.get("window");

const DeliveryModal = (props) => {
  const [ModalState, setModalState] = useState(false);

  const AddressRef = useRef();
  const CountryRef = useRef();
  const DonateRef = useRef();
  const ButtonRef = useRef();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = setModalState;
  });

  const HandleOrder = async () => {
    const shipping_address = AddressRef.current.getText();
    const shipping_country = CountryRef.current;
    const donate = DonateRef.current ? "yes" : "no";

    if (
      [shipping_address, shipping_country].filter((e) => e == null || e == "")?.length >= 1
    )
      return;

    ButtonRef.current.SetActivity(true, "WHITE");
    if (props.onConfirm)
      props.onConfirm({
        shipping_address,
        shipping_country,
        donate,
      });
    //    setModalState(false);
  };

  const CloseModal = () => {
    setModalState(!ModalState);
    if (props.onClose) props.onClose();
  };

  const GetCheckBox = () => {
    useEffect(() => {
      DonateRef.current = Selected;
    });
    const [Selected, setSelected] = useState(false);
    return (
      <BouncyCheckbox
        isChecked={Selected}
        iconStyle={{
          borderColor: Colors.PRIMARY_LABEL,
          borderRadius: 10,
          borderWidth: 1,
        }}
        unfillColor={Colors.BENEFICIARY}
        fillColor={Colors.PRIMARY_LABEL}
        borderRadius={10}
        style={{
          marginLeft: width * 0.22,
        }}
        onPress={(e) => setSelected(e)}
      />
    );
  };

  const GetCountrySection = () => {
    const CountryModalRef = useRef();

    const [CountryValue, setCountryValue] = useState("");

    useEffect(() => {
      CountryRef.current = CountryValue;
    });

    return (
      <View style={styles.InputView}>
        <CountryModal
          CountryRef={CountryModalRef}
          onChange={(e) => setCountryValue(e)}
        />
        <Label dark notAlign bold headingtype="h5">
          Country
        </Label>
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
      </View>
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
          Delivery Address
        </Label>
        <View style={styles.ModalBody}>
          <View style={styles.ModalInside}>
            <View style={styles.InputView}>
              <Label dark notAlign bold headingtype="h5">
                Address
              </Label>
              <InputField
                style={styles.UserFieldView}
                fieldstyle={styles.SearchInput}
                NoIcon
                white
                shadow
                placeholder="Enter complete address"
                autoCapitalize="none"
                placeholderTextColor={Colors.DARK_MUTED}
                ref={AddressRef}
              />
            </View>
            <GetCountrySection />
            <View style={styles.DonateView}>
              <GetCheckBox />
              <Label dark notAlign>
                I would like to donate this product
              </Label>
            </View>
            <View style={styles.WarningView}>
              <Label style={styles.WarningTxt} notAlign>
                Shipping charges may apply in case of other country
              </Label>
            </View>
            <LongButton
              gradient
              text="Confirm Order"
              style={styles.ConfirmBtn}
              ref={ButtonRef}
              onPress={HandleOrder}
            />
            <LabelButton
              text="Go back"
              black
              style={styles.GoBack}
              onPress={() => {
                if (!ButtonRef.current.GetActivity()) CloseModal();
              }}
            />
          </View>
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
  ModalInside: {
    width: width * 0.9,
    alignSelf: "center",
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
  UserFieldView: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.MUTED,
  },
  SearchInput: {
    paddingLeft: width * 0.08,
  },
  InputView: {
    marginTop: height * 0.02,
  },

  ChangeConView: {
    position: "absolute",
    width: width * 0.2,
    paddingRight: width * 0.05,
    marginTop: height * 0.052,
    height: height * 0.07,
    zIndex: 3,
    alignSelf: "flex-end",
  },
  ChangeCon: {
    zIndex: 4,
  },
  DonateView: {
    marginTop: height * 0.02,
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: Colors.BENEFICIARY,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  WarningView: {
    marginTop: height * 0.015,
    height: height * 0.08,
    backgroundColor: Colors.FAILED_BG,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  WarningTxt: {
    width: width * 0.8,
    color: Colors.FAILED,
  },
  ConfirmBtn: {
    marginTop: height * 0.015,
  },
  GoBack: {
    marginTop: height * 0.01,
  },
});

export default DeliveryModal;
