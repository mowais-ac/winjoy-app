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
import dayjs from "dayjs";
import { FormatNumber } from "../../Constants/Functions";

const GameShow = (props) => {

  return (
    <View style={styles.mainView}>


      <View style={{ height: height * 0.2, width: width * 0.9, marginTop: height * 0.02 }}>
        <FlatList
          horizontal={true}
          style={{ marginLeft: 1, width: width * 0.9, }}
          ItemSeparatorComponent={
            () => <View style={{ width: 16, }} />
          }
          scrollEnabled={false}
          contentContainerStyle={{

            marginLeft: 10,
            alignSelf: "flex-start",
            paddingRight: width * 0.04,



          }}
          ListEmptyComponent={() => (
            <View style={{ height: height * 0.16, width: width * 0.85, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000000', fontFamily: 'Axiforma Bold', fontSize: RFValue(15) }}>No Winners Found</Text>
            </View>
          )
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={props?.lastWinners}
          renderItem={({ item }) => (
            <View style={{ width: width * 0.25, height: height * 0.2, justifyContent: 'center', marginLeft: 3 }}>
              <ProfilePicture
                picture={item?.user?.profile_image}
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
              <View style={{ width: width * 0.36, height: height * 0.08, justifyContent: 'center', marginLeft: -6 }}>
                <Text style={[styles.text2, { textAlign: 'center', width: width * 0.29, }]}>
                  {item?.user?.first_name?.charAt(0)?.toUpperCase() + item?.user?.first_name?.slice(1) + " " + item?.user?.last_name?.charAt(0)?.toUpperCase() + item?.user?.last_name?.slice(1)}
                </Text>

                <Text style={[styles.text2, { width: width * 0.29, color: "#420E92", textAlign: 'center' }]}>
                  AED {FormatNumber(+(item?.price).toLocaleString())}
                </Text>
              </View>
            </View>

          )}
        //   keyExtractor={(item) => item.id}

        />
      </View>


      <FlatList
        data={props?.pastWinners}
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
                name={item?.user?.first_name?.charAt(0)?.toUpperCase() + item?.user?.first_name?.slice(1) + " " + item?.user?.last_name?.charAt(0)?.toUpperCase() + item?.user?.last_name?.slice(1)}
                date={dayjs(item.created_at).format('MMMM DD, YYYY')}

                ammount={FormatNumber(+(item?.price).toLocaleString())}
                profile_image={item?.user?.profile_image}
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
