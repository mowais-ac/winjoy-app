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
import { GameShowWinnersCard } from "../../Components";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from 'axios';
import ProfilePicture from "../../Components/ProfilePicture";
import { RFValue } from "react-native-responsive-fontsize";

const GameShow = (props) => {

  return (
    <View style={styles.mainView}>
      

     <View style={{height:height*0.2,width: width*0.9, marginTop:height*0.02}}>
     <FlatList
        horizontal={true}
        style={{ marginLeft: 1,  width: width*0.9, }}
        ItemSeparatorComponent={
          () => <View style={{ width: 16,}}/>
      }
      scrollEnabled={false}
        contentContainerStyle={{

          marginLeft: 10,
          alignSelf: "flex-start",
          paddingRight: width * 0.04,
          


        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={({ item }) => (
          <View style={{ width: width * 0.25, height: height * 0.2, justifyContent: 'center',marginLeft:3 }}>
            <ProfilePicture
              picture={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
              // id={userInfo?.id || userData?.id}
              name={"waqar"}
              style={styles.avatarViewTop}
            />
            <View style={{
              position: 'absolute', width: width * 0.14,
              height: width * 0.14, top: height * 0.012, left: -3
            }}>
              <Image
                source={require('../../assets/imgs/redStar.png')}
                style={{ width: 20, height: 20, }}
              />
            </View>
            <View style={{ width: width * 0.36, height: height * 0.08, justifyContent: 'center', }}>
              <Text style={styles.text2}>
                Waqar Hussain
              </Text>

              <Text style={[styles.text2, { width: width * 0.25, color: "#420E92", textAlign:'center' }]}>
                AED 12000
              </Text>
            </View>
          </View>

        )}
      //   keyExtractor={(item) => item.id}

      />
     </View>

    
      <FlatList 
        data={props?.winnersLastGame}
        contentContainerStyle={{}}
        // horizontal={true}
        ListHeaderComponent={() => 
                
          <Text style={[styles.text2, { width: width * 0.9, fontSize: RFValue(14), color: "#420E92" }]}>
        Past Winner
      </Text>
       
      }
        renderItem={
          ({ item, index }) => {
            return (
              <GameShowWinnersCard
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



export default GameShow;
