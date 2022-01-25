import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import { Card } from "../../Components";
import {
    widthPercentageToDP,
    heightPercentageToDP,
    heightConverter,
} from "../../Components/Helpers/Responsive";
import Header from "../../Components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductDetail = ({ props, navigation, route }) => {
    const item = route?.params?.data; 
    console.log("item", item);
    let progress = (item?.updated_stocks ? (item?.updated_stocks / item?.stock) * 100 : 0);
    console.log("item", item?.id);
    function uniqBy(a, key) {
        var seen = {};
        return a?.filter(function (item) {
            var k = key(item);
            return seen?.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }
    const SaveIdInfo = async () => {
        // await EncryptedStorage.setItem("ids","");
        AsyncStorage
            .getItem('ids')
            .then(favs => {
                favs = favs == null ? [] : JSON.parse(favs)


                favs.push(item?.id)
                let uniqueArray = favs.filter(function (item, pos) {
                    return favs.indexOf(item) == pos;
                });
                console.log("uniqueArray", uniqueArray);
                return AsyncStorage.setItem('ids', JSON.stringify(uniqueArray))
            })

        let dat = await AsyncStorage.getItem('ids');
        console.log("dat", dat);

    }

    return (
        <ScrollView>

        <View style={{ height: heightPercentageToDP("100%") }}>
           
            <LinearGradient
                style={styles.mainView}
                colors={["#420E92", "#E7003F"]}

            >
                <View style={{ height: 20 }} />
                <Header back={true} />


                <View style={styles.bottomView}>
                    <Label primary font={13} dark style={{ color: "#ffffff", marginTop: 9, marginBottom: 9, }}>
                        {item?.updated_stocks || 0} sold out of {item?.stock}
                    </Label>
                    <View style={styles.containerprogressBar}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#ff9000", "#e70100"]}
                            style={[
                                styles.LinerGradientProgrees,
                                { width: `${progress > 99 ? 99 : progress}%` },
                            ]}
                        />
                        <View style={styles.GreybarWidth} />
                    </View>


                </View>

            </LinearGradient>
            <View style={styles.upperView}>
                {/* <Card item={item} /> */}
            </View>
            <View style={styles.card}>

                <Label primary font={16} dark style={{ color: "#000000", marginTop: 30 }}>
                    Get a chance to
                    <Label notAlign primary font={16} bold style={{ color: "#E7003F" }}>
                        {" "}WIN
                    </Label>
                </Label>
                <Label font={16} dark style={{ color: "#000000" }}>
                    {item?.luckydraw?.gift_title}
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
                    {item?.description}
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
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>{+(item?.price)?.toLocaleString()}</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: widthPercentageToDP("83")
                }}>
                    <Text style={[styles.metaText, { fontWeight: 'bold' }]}>Buy a {item?.title}</Text>
                    <Text style={styles.text}>Gold Coin</Text>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        // navigation.navigate("SimpeStackScreen", {
                        //     screen: "Cart",
                        //   })]
                        SaveIdInfo()
                    }}
                    style={{
                        height: heightConverter(55),
                        width: width - 25,
                        position: 'absolute',
                        bottom: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={{
                            height: heightConverter(55),
                            width: width - 25,
                            position: 'absolute',
                            bottom: 0,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        colors={["#420E92", "#E7003F"]}

                    >
                        <Label primary font={16} bold style={{ color: "#ffffff" }}>
                            Add to Cart
                        </Label>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
          
        </View>
        </ScrollView>

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
        left: 2,
    },
    GreybarWidth: {
        width: widthPercentageToDP("95"),
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
        fontFamily: "Axiforma Regular",
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
        fontFamily: "Axiforma Regular",
    },
    text: {
        color: '#e7003f',
        fontFamily: "Axiforma Regular",
    }
});



export default ProductDetail;
