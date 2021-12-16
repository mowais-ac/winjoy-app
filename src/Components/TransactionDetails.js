import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Section from "../Components/Section";
import Label from "../Components/Label";
import InputField from "../Components/InputField";

import { Colors } from "../Constants/Index";
import { GetDate } from "../Constants/Functions";

const { width, height } = Dimensions.get("window");

const TransactionDetails = (props) => {
  const { details, nomessage } = props;
  const GetField = (props) => {
    const { name, val, style } = props;
    return (
      <View style={[styles.ItemView, style]}>
        <Label notAlign bold darkmuted text={name} />
        <Label
          notAlign
          bold
          dark
          text={val}
          style={styles.ItemLabel}
          {...props}
        />
      </View>
    );
  };

  return (
    <Section style={styles.SectionContainer}>
      <View style={[styles.SectionTop]}>
        <GetField name="Amount" val={+details.amount} />
        <GetField name="Coins" val={`${details.coin_type} coins`} />
        <GetField name="Transaction fee" val={+details.fee} />
        <GetField
          name="Transaction code"
          val={details.transaction_reference}
          primary
        />
        <GetField name="Date/Time" val={GetDate(details.updated_at)} />
      </View>
      <View style={styles.MessageView}>
        <Label notAlign bold dark darkmuted>
          Message
        </Label>
        {nomessage ? (
          <Label notAlign bold dark style={styles.Message}>
            {details.message}
          </Label>
        ) : (
          <InputField
            {...props}
            NoIcon
            placeholder="Type your message here"
            placeholderTextColor={Colors.MUTED}
            multiline
            style={[styles.Message, styles.Input]}
            fieldstyle={styles.InputField}
          />
        )}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  SectionContainer: {
    marginTop: height * 0.01,
    height: height * 0.385,
  },
  SectionTop: {
    height: height * 0.21,
    marginTop: height * 0.01,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LESS_MUTED,
  },
  ItemView: {
    marginTop: height * 0.013,
    marginLeft: width * 0.05,
  },
  ItemLabel: {
    position: "absolute",
    textAlign: "right",
    width: width * 0.85,
  },
  MessageView: {
    marginLeft: width * 0.05,
    marginTop: height * 0.01,
  },
  Message: {
    lineHeight: height * 0.025,
    width: width * 0.85,
  },
  Input: {
    backgroundColor: Colors.WHITE,
    width: width * 0.85,
    height: height * 0.1,
    alignSelf: "flex-start",
  },
  InputField: {
    textAlignVertical: "top",
    color: Colors.DARK_LABEL,
    width: width * 0.85,
    height: height * 0.11,
    alignSelf: "flex-start",
    paddingTop: height * 0.01,
  },
});

export default TransactionDetails;
