import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LongButton from "./LongButton";

const { width, height } = Dimensions.get("window");

const CoinsButtons = (props) => {
  const [CoinType, setCoinType] = useState(props.id);

  const HandleChange = (e) => {
    if (props.onChange) props.onChange(e);
    setCoinType(e);
  };

  useEffect(() => {
    if (props.TypeRef) props.TypeRef.current = CoinType;
    if (props.useEffect) props.useEffect(CoinType);
  });
  return (
    <View style={styles.ButtonsView}>
      <LongButton
        MutedBtn
        text="Gold"
        style={styles.TypeBtn}
        MutedBtn={CoinType !== 0}
        onPress={() => HandleChange(0)}
      />
      {!props.NoDiamond && (
        <LongButton
          MutedBtn
          text="Diamond"
          style={styles.TypeBtn}
          MutedBtn={CoinType !== 1}
          onPress={() => HandleChange(1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.65,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  TypeBtn: { width: width * 0.3 },
});

export default CoinsButtons;
