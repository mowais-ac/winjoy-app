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
            picture={userInfo?.profile_image || userData?.profile_image}
            id={userInfo?.id || userData?.id}
            name={(userInfo?.first_name.slice(0, 1) + userInfo?.last_name.slice(0, 1)) || (userData?.first_name.slice(0, 1) + userData?.last_name.slice(0, 1))}
            style={styles.avatarView}
          />
        </View>

        <View>
          <Text style={styles.text}>
            {userInfo?.first_name || userData.first_name} {userInfo?.last_name || userData?.last_name}
          </Text>
          {date && userData.country ? (
            <Text style={styles.text}>
            {userData.user_name}
          </Text>
           
          ) : <Text style={styles.text}>
          {date}
        </Text>}
        </View>
        <Text style={styles.text2}>
          {userData?.price || userData.country}
        </Text>


      </View>
    </TouchableOpacity>
  );
}

export { TriviaCard };
