import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import ProfilePicture from "../ProfilePicture";
import styles from "./Styles";

function LeaderBoardCard({ onPress, fullname, profile_image,ammount }) {
 
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.mainView}>
        <View style={styles.avatarView}>
          <ProfilePicture
            picture={profile_image}
           // id={userInfo?.id || userData?.id}
            name={fullname?.charAt(0)}
            style={styles.avatarView}
          />
        </View>

        <View>
          <Text style={styles.text}>
          {fullname}
          </Text>
          {/* {date && userData.country ? (
            <Text style={styles.text}>
            {userData.user_name}
          </Text>
           
          ) : <Text style={styles.text}>
          {date}
        </Text>} */}
        </View>
        <Text style={styles.text2}>
          {ammount}
        </Text>

       
      </View>
    </TouchableOpacity>
  );
}

export { LeaderBoardCard };
