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
import { Card } from "../../Components";
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
const ProductDetail = ({ props, navigation }) => {

    return (


        <View style={{ height: heightPercentageToDP("100%") }}>
            <LinearGradient
                style={styles.mainView}
                colors={["#420E92", "#E7003F"]}

            >
                <View style={{ height: 20 }} />
                <Header back={true} />


                <View style={styles.bottomView}>
                    <Label primary font={13} dark style={{ color: "#ffffff", marginTop: 9, marginBottom: 9, }}>
                        1320 sold out of 2700
                    </Label>
                    <View style={styles.containerprogressBar}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#ff9000", "#e70100"]}
                            style={[
                                styles.LinerGradientProgrees,
                                { width: "70%" },
                            ]}
                        />
                        <View style={styles.GreybarWidth} />
                    </View>


                </View>

            </LinearGradient>
            <View style={styles.upperView}>
                <Card />
            </View>
            <View style={styles.card}>

                <Label primary font={16} dark style={{ color: "#000000", marginTop: 30 }}>
                    Get a chance to
                    <Label notAlign primary font={16} bold style={{ color: "#E7003F" }}>
                        {" "}WIN
                    </Label>
                </Label>
                <Label font={16} dark style={{ color: "#000000" }}>
                    Mercedez 2021 Limited Edition
                </Label>
                <Text style={styles.closingTxt}>
                    Closing Soon
                </Text>
            </View>
            <View style={styles.pdView}>
                <Label notAlign primary font={16} bold style={{ color: "#E7003F" }}>
                    Products Details
                </Label>
                <Label notAlign font={11} dark style={{ color: "#000000", lineHeight: 20 }}>
                    Lorem ipsum dolor sit amet. Vel dicta molestiae ex similique nesciunt ut ducimus atque vel ipsam voluptatem. Est autem consequatur quo eligendi omnis aut reprehenderit quibusdam non dolorum voluptatum. Qui quasi libero et quasi nobis eos totam neque sit eaque exercitationem.
                </Label>
            </View>
            <View style={styles.card2}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: widthPercentageToDP("83")
                }}>
                    <Text style={styles.metaText}>To enter in the lucky draw</Text>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>8,000</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: widthPercentageToDP("83")
                }}>
                    <Text style={[styles.metaText, { fontWeight: 'bold' }]}>Buy a H2H Hoodie</Text>
                    <Text style={styles.text}>Gold Coin</Text>

                </View>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{
                        height: heightConverter(55),
                        width: width - 25,
                        position:'absolute',
                        bottom:0,
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    colors={["#420E92", "#E7003F"]}

                >
                    <Label  primary font={16} bold style={{ color: "#ffffff" }}>
                   Add to Cart
                </Label>
                </LinearGradient>

            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    mainView: {
        height: heightConverter(200),
    },
    bottomView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    LinerGradientProgrees: {
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        borderRadius: 9,
        height: 14,
        left: 2
    },
    GreybarWidth: {
        width: 368,
        height: 18,
        zIndex: -1,
        position: "absolute",
        backgroundColor: "#EADFE3",
        borderRadius: 9,


    },
    containerprogressBar: {
        width: widthPercentageToDP("95"),
        marginBottom: 1,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 3,
        marginLeft: 2,
        zIndex: 1

    },
    upperView: {
        top: heightPercentageToDP('16%'),
        position: 'absolute',

    },
    card: {
        width: width - 25,
        height: height * 0.1,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        top: height * 0.16,
        left: 2,
        justifyContent: 'center', alignItems: 'center',
        elevation: 3,
        marginBottom: 15
    },
    card2: {
        width: width - 25,
        height: height * 0.15,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        bottom: 0,
        left: 2,
       alignItems: 'center',
        elevation: 3,
        position: 'absolute',
        marginBottom: 20
    },
    closingTxt: {
        color: '#ffffff',
        backgroundColor: '#e7003f',
        fontFamily: "Axiforma-Regular",
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 20,
        top: heightConverter(2)
    },
    pdView: {
        position: 'absolute',
        bottom: heightPercentageToDP("22"),
        height: heightPercentageToDP("25"),
        padding: 20,

    },
    metaText: {
        color: '#000000',
        fontFamily: "Axiforma-Regular",
    },
    text: {
        color: '#e7003f',
        fontFamily: "Axiforma-Regular",
    }
});



export default ProductDetail;
