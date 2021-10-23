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
import Config from "react-native-config";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../Constants/Colors";
import BackIcon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");
const WrongAnswer = ({ navigation, route }) => {
    return (

        <ScrollView>

            <LinearGradient
                style={styles.mainView}
                colors={["#420E92", "#E7003F"]}

            >
                <View style={{ height: 20 }} />
                <Header back={true} />
                <View style={styles.bottomView}>


                    <View style={{
                    
                        
                    }}>
                        <Text style={styles.yellowText}>
                            Wrong Answer
                        </Text>
                    </View>
                    <View style={{
                        marginTop: heightConverter(40),
                        marginBottom: 20
                    }}>
                        <Text style={[styles.text, { fontSize: 20,width:widthConverter(250) }]}>
                            Ohh, you just selected the
                            wrong answer, the correct answer is {route?.params?.Tans}
                        </Text>
                    </View>
                    <Text style={[styles.text, { fontSize: 20,width:widthConverter(250) }]}>
                        Don’t loose hope!
                        Try next time
                    </Text>


                    <RewardzButton
                        text={"Back to Home"}
                        textStyle={[styles.btnText, { color: "#FFFFFF", fontSize: 24, }]}
                        btnStyle={{ width: widthPercentageToDP("80%"), backgroundColor: null, top: 20 }}
                        onPress={() => navigation.navigate("Landing")}
                    />
                </View>

            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        height: heightPercentageToDP("100%"),
    },
    bottomView: {
        height: heightPercentageToDP("80%"),
        alignItems: 'center',
        justifyContent: 'center',
       
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
    Container: {
        flexDirection: "row",
    },
    containerBack: {
        flexDirection: 'row',
        width: widthConverter(90),
        marginRight: widthConverter(-30)

    },
    text: {
        fontFamily: "Axiforma-Regular",
        fontSize: RFValue(14),
        color: Colors.LABEL,
        left: 4,
        textAlign: 'center',
        lineHeight:heightConverter(30)
    },
});



export default WrongAnswer;
