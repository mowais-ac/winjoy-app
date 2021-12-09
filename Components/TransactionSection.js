import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Section from "../Components/Section";
import Label from "../Components/Label";

import { Colors, Images } from "../Constants/Index";
import { GetDate } from "../Constants/Functions";

const { width, height } = Dimensions.get("window");

const TransactionSection = (props) => {
  const { item, send } = props;

  const styles = StyleSheet.create({
    Section: {
      marginTop: height * 0.015,
      flexDirection: "row",
    },
    SectionImage: {
      width: width * 0.14,
      height: height * 0.045,
      resizeMode: "contain",
      alignSelf: "center",
      marginLeft: width * 0.05,
    },
    SectionHead: {
      flexDirection: "column",
      alignSelf: "center",
      marginLeft: width * 0.06,
      width: width * 0.35,
    },
    SectionViewAmount: {
      position: "absolute",
      marginLeft: width * 0.6,
      alignSelf: "center",
    },
    SectionAmount: {
      color: send ? Colors.SUCCESS : Colors.FAILED,
      width: width * 0.3,
      textAlign: "right",
    },
  });

  const GetSectionData = () => (
    <>
      <Image
        source={send ? Images.Send : Images.Withdraw}
        style={styles.SectionImage}
      />
      <View style={styles.SectionHead}>
        <Label dark notAlign bold font={15}>
          {item.transaction_reference}
        </Label>
        <Label dark notAlign light>
          {GetDate(item.updated_at)}
        </Label>
      </View>
      <View style={styles.SectionViewAmount}>
        <Label dark notAlign style={styles.SectionAmount} headingtype={"h5"}>
          {send ? <>+</> : <>-</>}
          {+item.amount}
        </Label>
      </View>
    </>
  );

  return (
    <Section style={styles.Section}>
      {props.Button ? (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: width * 0.95,
            height: height * 0.1,
          }}
          onPress={props.onPress}
        >
          {GetSectionData()}
        </TouchableOpacity>
      ) : (
        GetSectionData()
      )}
    </Section>
  );
};

export default TransactionSection;
