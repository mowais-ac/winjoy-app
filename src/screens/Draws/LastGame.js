import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import { TriviaAvatar, LeaderBoardCard } from "../../Components";
import { heightPercentageToDP } from "../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage"; 
import Config from "react-native-config";
import axios from 'axios';

const LastGame = (props) => {

  return (
    <View style={styles.mainView}>
        <FlatList
          data={[1,2,3,4,5]}
         contentContainerStyle={{marginTop:height*0.02}}
          // horizontal={true}
          renderItem={
            ({ item, index }) => {
              return (
                <LeaderBoardCard
                date={props.date}
                name={props.name}
                //ammount={"AED 20,000"}
                profile_image={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
                onPress={()=>navigation.navigate("LastGameWinnerDetail")}
                />
              )
            }
          }
        />

    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: height*0.7,
    width: width,
    alignItems: 'center',
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: height - 600,
    justifyContent: 'center',
    borderRadius: 20
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: height - 665,
    justifyContent: 'center',
    borderRadius: 30
  }
});



export default LastGame;
