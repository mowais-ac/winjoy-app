import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import { LuckyDrawWinnersCard } from "../../Components";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from 'axios';
import ProfilePicture from "../../Components/ProfilePicture";
import { RFValue } from "react-native-responsive-fontsize";

const LuckyDraw = (props) => {

  return (
    <View style={styles.mainView}>
      

    

    
      <FlatList 
        data={props?.winnersLastGame}
        contentContainerStyle={{}}
        // horizontal={true}
     
        renderItem={
          ({ item, index }) => {
            return (
              <LuckyDrawWinnersCard
                name={"Waqar Hussain"}
                date={"january 20, 2022"}
                ammount={item?.price}
                profile_image={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
              // onPress={()=>navigation.navigate("LastGameWinnerDetail")}
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
    height: height * 0.7,
    width: width,
    alignItems: 'center',
  },
  avatarViewTop: {
    width: height * 0.12,
    height: height * 0.12

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
  },
  text: {
    fontFamily: "Axiforma Regular",
    color: '#000000',
    fontSize: RFValue(12)
  },
  text2: {
    fontFamily: "Axiforma SemiBold",
    color: "#000000",
    fontSize: RFValue(12),
   
  }
});



export default LuckyDraw;
