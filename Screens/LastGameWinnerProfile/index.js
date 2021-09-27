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
let data = [1, 2, 3, 4]
let data2 = ["DashBoard", "LeaderBoard", "played Games", "Friends", "View Profile", "My Orders", "My Address", "Logout"]
const LastGameWinnerProfile = ({ props, navigation }) => {

    return (

        <ScrollView>
            <LinearGradient

                colors={["#420E92", "#E7003F"]}
           
             >
                <View style={{ height: 20 }} />
                <Header back={true} />
                <View style={styles.aView}>
                    <View style={styles.bView}>
                        <View style={styles.topView}>
                            <View style={styles.avatarView}>
                                <Avatar
                                    rounded
                                    size={80}

                                    // title="MD"
                                    source={{
                                        uri:
                                            'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg'
                                    }}
                                />
                            </View>

                            <View style={{ width: widthConverter(250), marginLeft: 20 }}>
                                <Label font={14} notAlign bold style={{ color: "#FFFFFF", marginTop: 8, }}>
                                    Penny N. Doamin
                                </Label>
                                <Label primary notAlign font={14} bold style={{ color: "#FFFFFF", marginTop: 8 }}>
                                    Senior Product Analyst
                                    <Label primary font={14} notAlign style={{ color: "#e2acc7" }}>
                                        {" "}at{" "}
                                    </Label>
                                    MicroSoft
                                </Label>
                            </View>

                        </View>
                        <View
                            style={{
                                marginTop: 20,
                                height: 1,
                                width: widthConverter(375),
                                backgroundColor: "#72407e",
                            }}
                        />
                        <Text style={[styles.text, { color: "#ffffff", padding: 15 }]}>
                            My Friends
                        </Text>
                        <FlatList
                            data={data}
                            horizontal={true}


                            renderItem={
                                ({ item, index }) => {
                                    return (
                                        <View style={[styles.avatarView, {
                                            width: widthConverter(70),
                                            height: widthConverter(70),
                                            borderRadius: heightConverter(70),
                                            marginLeft: 15
                                        }]}>
                                            <Avatar
                                                rounded
                                                size={70}

                                                // title="MD"
                                                source={{
                                                    uri:
                                                        'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg'
                                                }}
                                            />
                                        </View>
                                    )
                                }
                            }
                        />
                        <View style={styles.footer}>
                            <Text style={styles.text}>
                                2,034 Friends
                            </Text>
                            <Text style={[styles.text, { color: "#ffff00" }]}>
                                View all Friends
                            </Text>


                        </View>
                    </View>
                    <FlatList
                        data={data2}

                        // horizontal={true}
                        ItemSeparatorComponent={() => {
                            return (
                                <View
                                    style={{
                                        marginTop: 10,
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
                                    <View style={{
                                        width: widthPercentageToDP("90%"),
                                        marginTop: 10, marginLeft: 15
                                    }}>
                                        <Text style={[styles.text, { color: "#ffffff",height:heightPercentageToDP("5%"),top:10 }]}>
                                            {item}
                                        </Text>
                                    </View>
                                )
                            }
                        }
                    />
                </View>
            </LinearGradient>
        </ScrollView>
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
        // alignItems: 'center',
        width: widthPercentageToDP("100%"),
        marginTop: 20,

    },
    bView: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: heightPercentageToDP("43%"),
    },
    flatListHeader: {
        marginTop: heightConverter(20),
        width: widthPercentageToDP("100%"),
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: heightConverter(65),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    footer: {
        height: heightConverter(50),
        justifyContent: 'center',
        width: widthPercentageToDP("100%"),
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topView: {

        width: widthPercentageToDP("100%"),
        justifyContent: 'center',
        paddingTop: 15,
        flexDirection: 'row',

    },
    avatarView: {
        //position: 'absolute',

        width: widthConverter(80),
        height: widthConverter(80),
        borderRadius: heightConverter(80),
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
        fontSize: 16
    },
});



export default LastGameWinnerProfile;
