import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import styles from "./Styles";

function ProductViewCard({ onPress, fullname, ammount, profile_image, title }) {

  return (
    <View style={styles.mainView}>
      <View style={styles.avatarView}>
        <Image
          source={{
            uri: profile_image
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius:10,
          }}
        />
      </View>
      {title ? (
        <>
          <Label primary font={12} bold style={{ color: "#fff",marginTop: 8 }}>
            {ammount}
          </Label>
        </>
      ) : null}

    </View>
  );
}

export { ProductViewCard };
