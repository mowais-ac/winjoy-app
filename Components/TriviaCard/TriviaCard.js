import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Label from "../Label";
import styles from "./Styles";

function TriviaCard({onPress,fullname,date,ammount,profile_image }) {

  return (
   <TouchableOpacity
   onPress={onPress}
   >
      <View style={styles.mainView}>
      <View style={styles.avatarView}>
        <Avatar
          rounded
          size={70}

           title="MD"
          source={{
            uri:profile_image
          }}
        />
      </View>

     <View>
     <Text style={styles.text}>
       {fullname}
      </Text>
     {date?(
        <Text style={styles.text}>
        {date}
        </Text>
     ):null}
     </View>
      <Text style={styles.text2}>
       {ammount}
      </Text>


    </View>
   </TouchableOpacity>
  );
}

export { TriviaCard };
