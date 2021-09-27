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
import { TriviaAvatar, TriviaCard, RewardzButton } from "../../Components";
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
const Congrats = ({ props, navigation }) => {

    return (

        <ScrollView>
            <LinearGradient
                style={styles.mainView}
                colors={["#420E92", "#E7003F"]}

            >
                <View style={{ height: 20 }} />
                <Header back={true} />
                <View style={styles.bottomView}>
                    <Text style={[styles.text, {
                        marginTop: 20,
                        marginBottom: 20
                    }]}>
                        Congratulations
                    </Text>

                    <View style={{
                        marginBottom: 20
                    }}>
                        <Text style={[styles.yellowText, { fontWeight: 'normal', fontSize: 28 }]}>
                            You're a
                        </Text>
                        <Text style={styles.yellowText}>
                           WINNER
                        </Text>
                    </View>
                    <View style={styles.avatarView}>
                        <Avatar
                            rounded
                            size={160}

                            // title="MD"
                            source={{
                                uri:
                                    'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg'
                            }}
                        />
                    </View>
                    <Text style={[styles.text, { fontSize: 20 }]}>
                        You Won
                    </Text>
                    <Text style={[styles.yellowText,{marginBottom:10}]}>
                        <Text style={[styles.yellowText, { fontWeight: 'normal' }]}>
                            AED{" "}
                        </Text>
                        2,000
                    </Text>
                    <RewardzButton
                        text={"Go to LeaderBoard"}
                        textStyle={[styles.btnText, { color: "#E7003F", fontSize: 24 }]}
                        btnStyle={{ width: widthPercentageToDP("80%"), }}
                    />
                    <RewardzButton
                        text={"Back to Home"}
                        textStyle={[styles.btnText, { color: "#FFFFFF", fontSize: 24, }]}
                        btnStyle={{ width: widthPercentageToDP("80%"), backgroundColor: null, top: 20 }}
                    />
                </View>

            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        height: heightPercentageToDP("100%")
    },
    bottomView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: "Axiforma-Regular",
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,

    },
    yellowText: {
        fontFamily: "Axiforma-Regular",
        color: '#ffff00',
        fontSize: 32,
        fontWeight: 'bold',

    },
    btnText: {
        fontFamily: "Axiforma-Regular",
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',

    },
    avatarView: {
        //position: 'absolute',

        width: widthConverter(160),
        height: widthConverter(160),
        borderRadius: heightConverter(160),
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
});



export default Congrats;
