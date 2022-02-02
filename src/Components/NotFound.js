import React, { useRef } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

import { Images, Colors } from "../Constants/Index";
import Label from "./Label";
import LongButton from "./LongButton";
import AddConnectionModal from "./AddConnectionModal";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const NotFound = (props) => {
  const ConModalRef = useRef();
  const navigation = useNavigation();
  return (
    <View style={props.style}>
      <Image source={Images.NotFound} style={styles.Img} />
      <Label primary bold headingtype="h1" style={styles.Heading}>
        No {props.text} found
      </Label>
      <Label dark style={styles.Info}>
        {props.desc ||
          "Sorry, we don’t have enough data to show you right now. Please check again later."}
      </Label>
      <View style={styles.SmallBorder} />
      {!props.NoSupport && (
        <>
          {!props.con && (
            <Label dark bold headingtype="h4" style={styles.HeadingQuestion}>
              Any Question?
            </Label>
          )}
          <AddConnectionModal ModalRef={ConModalRef} DisplayAlert />
          <LongButton
            text={props.con ? "Add connection" : "Contact Support"}
            textstyle={{color:props.con ? undefined : "red"}}
            style={styles.Btn}
            shadowless
            onPress={() => {
              if (props.ConModal) {
                ConModalRef.current(true);
              } else
                navigation.navigate("MenuStack", {
                  screen: props.con ? "Connections" : "ContactUs",
                  params: {
                    OpenAddCon: true,
                  },
                });
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Img: {
    marginTop: height * 0.03,
    resizeMode: "contain",
    width: width * 0.625,
    height: height * 0.2,
    alignSelf: "center",
  },
  Heading: {
    marginTop: height * 0.02,
    color:"#fff"
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color:"red"
  },
  SmallBorder: {
    width: width * 0.15,
    height: 2,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  HeadingQuestion: {
    marginTop: height * 0.02,
    color:"red"
  },
  Btn: {
    marginTop: height * 0.02,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LABEL,
    backgroundColor: Colors.INVISIBLE,
  },
});

export default NotFound;
