import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import Label from "../../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import { TriviaAvatar, LeaderBoardCard } from "../../../Components";
import { heightPercentageToDP } from "../../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage"; 
import Config from "react-native-config";
import axios from 'axios';

const LastGame = ({ props, navigation }) => {
  const [winnerData, setWinnerData] = useState([]);
  useEffect( () => {
    GetData()
  },[]);

  const GetData = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }; 
    
    await axios.get(`${Config.API_URL}/luckydraw/winner`, requestOptions).then(response => {
      let res = response;
      setWinnerData(res?.data[0])
    });

}
  return (
    <View style={styles.mainView}>
      <LinearGradient

        colors={["#5f0c83", "#840871"]}
        style={{ alignItems: 'center', justifyContent: 'center', width: width, paddingBottom: 15 }}>
        <FlatList
          data={winnerData}
          horizontal={true}
          renderItem={
            ({ item, index }) => {
              console.log("item",item.winnerfull_name);
              return (
                <TriviaAvatar
                  title={true}
                  fullname={item?.winnerfull_name}
                  ammount={"AED 20000"}
                  profile_image={item?.profile_image}
                />
              )
            }
          }
        />
      </LinearGradient>
      <LinearGradient

        colors={["#5e064e", "#a1002d"]}
        style={{ alignItems: 'center', justifyContent: 'center', width: width, height: heightPercentageToDP("60%") }}>
        <Label notAlign bold style={{ top: 5, color: "#FFFFFF", marginTop: 8, fontSize: 16 }}>
          All Winners
        </Label>
        <FlatList
          data={winnerData}
         
          // horizontal={true}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  marginTop:20,
                  height: 1,
                  width: "100%",
                  backgroundColor: "#994e7c",
                }}
              />
            );
          }



          }
          renderItem={
            ({ item, index }) => {
              return (
                <LeaderBoardCard
                fullname={item?.winnerfull_name}
                ammount={"AED 20000"}
                profile_image={item?.profile_image}
                onPress={()=>navigation.navigate("LastGameWinnerDetail")}
                />
              )
            }
          }
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 800,
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
