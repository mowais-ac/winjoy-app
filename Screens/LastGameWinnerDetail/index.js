import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Text,
    FlatList
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../Components/HomeBottomList";
import { TriviaAvatar, TriviaCard } from "../../Components";
import {
    widthPercentageToDP,
    heightPercentageToDP,
    heightConverter,
    widthConverter,
} from "../../Components/Helpers/Responsive";
import Background from "../../Components/Background";
import Header from "../../Components/Header";
import { Avatar } from "react-native-elements";
let data = [1, 2, 3]
const LastGame = ({ props, navigation }) => {

    return (
   
        <>
            <Background height={1} />
            <View style={{ height: 20 }} />
            <Header back={true} />
            <View style={styles.aView}>
                <View style={styles.avatarView}>
                    <Avatar
                        rounded
                        size={130}

                        // title="MD"
                        source={{
                            uri:
                                'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg'
                        }}
                    />
                </View>

                <Label font={14} style={{ color: "#FFFFFF", marginTop: 8, }}>
                    Penny N. Doamin
                </Label>
                <Label primary font={14} bold style={{ color: "#FFFFFF",marginTop: 8 }}>
                    Senior Product Analyst
                    <Label primary font={14} style={{ color: "#e2acc7" }}>
                        {" "}at{" "}
                    </Label>
                    MicroSoft
                </Label>

                <View style={styles.flatListHeader}>
                    <Text style={[styles.text,{color:"#ffff00"}]}>
                       Play Games
                    </Text>
                    <Text style={styles.text}>
                        About
                    </Text>
                    <Text style={styles.text}>
                      Friends
                    </Text>
                </View>
                <Label notAlign style={{ top: 5, color: "#FFFFFF", marginTop: 8, fontSize: 16 }}>
             Played Games
            </Label>
            <FlatList
              data={data}

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
                    <TriviaCard
                    onPress={()=>navigation.navigate("LastGameWinnerProfile")} 
                    />
                  )
                }
              }
            />
            </View>
        </>
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
    },



    aView: {
        alignItems: 'center',
        width: widthPercentageToDP("100%"),
        marginTop: 20,
    },
    flatListHeader: {
        marginTop: heightConverter(20),
        width: widthPercentageToDP("100%"),
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: heightConverter(65),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    avatarView: {
        //position: 'absolute',

        width: widthConverter(130),
        height: widthConverter(130),
        borderRadius: heightConverter(130),
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ffffff",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
    },
    text: {
        fontFamily: "Axiforma-Regular",
        color: '#ffffff',
        fontSize:16
    },
});



export default LastGame;
