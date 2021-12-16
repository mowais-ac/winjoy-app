import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import styles from "./Styles";

function TriviaAvatar({onPress,fullname,ammount,profile_image ,title}) {

  return (
    <View style={styles.mainView}>
      <View style={styles.avatarView}>
        <Avatar
          rounded
          size={90}

          // title="MD"
          source={{
            uri:profile_image
          }}
        />
      </View>
      {title?(
      <>
        <Label  style={{ color: "#FFFFFF",marginTop:8 }}>
      {  fullname}
      </Label>
      <Label  primary font={12} bold style={{ color: "#FFFF00" }}>
       {ammount}
      </Label>
      </>
      ):null}

    </View>
  );
}

export { TriviaAvatar };
