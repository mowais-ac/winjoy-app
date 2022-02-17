import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
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
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";
import dayjs from "dayjs";
import types from "../../redux/types";
const ProductDetail = ({ props, navigation, route }) => {
    const dispatch = useDispatch();
    const item = route?.params?.data;
    console.log("item", item);
    let progress = (item?.product?.updated_stocks ? (item?.product?.updated_stocks / item?.stock) * 100 : 0);
    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }
    const SaveIdInfo = async () => {
        // await EncryptedStorage.setItem("ids","");
        AsyncStorage
            .getItem('ids')
            .then(favs => {
                favs = favs == null ? [] : JSON.parse(favs)


                favs.push(item?.product?.id)
                let uniqueArray = favs.filter(function (item, pos) {
                    return favs.indexOf(item) == pos;
                });
                dispatch({
                    type: types.CART_COUNTER,
                    counter: uniqueArray?.length,
                });
                return AsyncStorage.setItem('ids', JSON.stringify(uniqueArray))
            })

        let dat = await AsyncStorage.getItem('ids');

    }

    return (


        <SafeAreaView style={{ height: "100%", paddingBottom: 120 }}>
            <ScrollView style={{}}>
                <LinearGradient
                    style={styles.mainView}
                    colors={["#420E92", "#E7003F"]}

                >
                    <View style={{ height: 20 }} />
                    <Header back={true} />




                </LinearGradient>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={[styles.upperView]}>

                        <Card
                            imageUrl={item?.product?.image}
                            updated_stocks={item?.product?.updated_stocks}
                            stock={item?.product?.stock}
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={{ color: '#000000', fontFamily: 'Axiforma-Regular', fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#E6DFEE', width: '100%', textAlign: 'center', paddingVertical: 10 }}>Buy outwear jacket</Text>

                        <Label primary font={16} dark style={{ color: "#E7003F", marginTop: 10 }}>
                            Get a chance to win

                        </Label>
                        <Label font={16} dark style={{ color: "#000000" }}>
                            {item.prize_title}
                        </Label>
                        <Label font={12} light style={{ color: "#000000", paddingVertical: 10,lineHeight:17 }}>
                            Max draw date {dayjs(item?.end_date).format('MMMM DD, YYYY')} or when the campaign is sold out, which is earliest
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
                            {item?.product?.description}
                        </Label>
                    </View>

                </View>

            </ScrollView>
            <View style={styles.card2Wrap}>
                <View style={styles.card2}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: "100%",
                        paddingHorizontal: 15,
                        paddingVertical: 8


                    }}>
                        <View>
                            <Text style={styles.metaText}>To enter in the lucky draw</Text>
                            <Text style={[styles.metaText, { fontWeight: 'bold' }]}>Buy a {item?.product?.title}</Text>
                        </View>
                        <Text style={[styles.text, { fontWeight: 'bold', fontSize: RFValue(14) }]}>AED {+(item?.product?.price)?.toLocaleString()}</Text>

                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            SaveIdInfo()
                        }}

                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={{
                                width: "100%",
                                paddingVertical: 12,

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
        </SafeAreaView>


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
        marginTop: -height * 0.13,
        //  position: 'absolute',
        width: '100%',



    },
    card: {
        width: "100%",
        marginVertical: 10,
        backgroundColor: '#ffffff',
        paddingBottom: 22,
        marginBottom: 30,
        borderRadius: 10,


        justifyContent: 'center', alignItems: 'center',
        elevation: 3,


    },
    card2Wrap: {
        bottom: 10, left: 0, position: 'absolute',
        paddingHorizontal: 15, width: '100%'
    },
    card2: {

        width: "100%",
        backgroundColor: '#ffffff',
        marginTop: 10,
        borderRadius: 10,





        elevation: 3,


    },

    closingTxt: {
        color: '#ffffff',
        backgroundColor: '#e7003f',
        fontFamily: "Axiforma-Regular",
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 10,
        width: 140,
        textAlign: 'center',
        borderRadius: 20,
        left: '50%',
        marginLeft: -70,
        bottom: -20,
        position: 'absolute'
    },
    pdView: {



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
