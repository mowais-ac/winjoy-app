import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import ProfilePicture from "../ProfilePicture";
import styles from "./Styles";

function TriviaCard({ onPress, userInfo, userData }) {
  const date = new Date(userData?.updated_at).toLocaleDateString()
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.mainView}>
        <View style={styles.avatarView}>
          <ProfilePicture
            picture={userInfo?.profile_image}
            id={userInfo?.id}
            name={userInfo?.first_name.slice(0, 1) + userInfo?.last_name.slice(0, 1)}
            style={styles.avatarView}
          />
        </View>

        <View>
          <Text style={styles.text}>
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
          {date ? (
            <Text style={styles.text}>
              {date}
            </Text>
          ) : null}
        </View>
        <Text style={styles.text2}>
          {userData?.price}
        </Text>


      </View>
    </TouchableOpacity>
  );
}

export { TriviaCard };
