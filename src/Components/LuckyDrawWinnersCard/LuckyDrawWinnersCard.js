import React, { useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import LoaderImage from "../LoaderImage";
import ProfilePicture from "../ProfilePicture";
import styles from "./Styles";
const { width, height } = Dimensions.get("window");
function LuckyDrawWinnersCard({ onPress, date, profile_image, name, prize_image }) {

  return (
    <TouchableOpacity
      onPress={onPress}
    > 
      <View style={styles.mainView}>
        <View style={styles.avatarView}>
          <ProfilePicture
            picture={profile_image}
            // id={userInfo?.id || userData?.id}
            name={name}
            style={styles.avatarView}
          />
          <View style={{
            position: 'absolute',  width: width * 0.14,
            height: width * 0.14,top:height*0.012,left:-3
          }}>
            <Image
              source={require('../../assets/imgs/greenStar.png')}
              style={{ width: 15, height: 15,}}
            />
          </View>
        </View>

        <View style={{ width: width * 0.36, height: height * 0.08, justifyContent: 'center', }}>
          <Text style={styles.text}>
            {date}
          </Text>
          <Text style={styles.text2}>
            {name}
          </Text>

        </View>

        <Image
               source={{uri:prize_image}}
              style={{ width: 45, height: 45,}}
            />

      </View>
    </TouchableOpacity>
  );
}

export { LuckyDrawWinnersCard };
