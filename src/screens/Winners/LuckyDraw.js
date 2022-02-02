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
import dayjs from "dayjs";

const LuckyDraw = (props) => {

  return (
    <View style={styles.mainView}>
      
      <FlatList 
        data={props?.winnersLastGame}
        contentContainerStyle={{}}
        scrollEnabled={false}
        // horizontal={true}
     
        renderItem={
          ({ item, index }) => {
            return (
              <LuckyDrawWinnersCard
              name={item?.user?.first_name?.charAt(0)?.toUpperCase() + item?.user?.first_name?.slice(1)+" "+item?.user?.last_name?.charAt(0)?.toUpperCase() + item?.user?.last_name?.slice(1)}
              date={dayjs(item.created_at).format('MMMM DD, YYYY')}
                ammount={item?.price}
                profile_image={item?.user?.profile_image}
                prize_image={item?.prize_image?.prize_image}
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
