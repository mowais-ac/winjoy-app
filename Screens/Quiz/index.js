import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    ImageBackground,
    ScrollView,
    SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Background from "../../Components/Background";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { QuizOptions } from "../../Components";
const { width, height } = Dimensions.get("window");
const index = ({props,navigation}) => {

    return (

        <SafeAreaView>

            <Background height={1} />
            <View style={{ height: 20 }} />
            <ScrollView>
                <Header back={true} />

                <ImageBackground
                    source={require("../../assets/imgs/game.png")}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                    imageStyle={{ borderRadius: 30 }}
                >
                    <LinearGradient
                        colors={["rgba(43,23,81,0)", "rgba(43,23,81,1)"]}
                        style={styles.gradientView}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 30
                        }}>
                            <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                Question
                            </Label>
                            <Label primary font={16} bold dark style={{ color: "#ffff",lineHeight:32 }}>
                                Which company initially developed Android mobile OS?
                            </Label>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <QuizOptions options={"Symbian Ltd,Android Inc,Google"} onPress={() => alert("hii")} />

                <LongButton style={styles.Margin}
                    textstyle={{ color: '#ffffff' }}
                    text="Done"
                    font={17}
                    onPress={()=>navigation.navigate("QuizAnswer")}
                />
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        top: 50,
        height: 350,
        width: '100%',
        flex: 1,
        position: 'absolute',
    },
    gradientView: {
        borderRadius: 30,
        height: 350,
        width: '100%',

    },
    scrollViewStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 60
    },
    homeView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    Margin: {
        marginTop: height * 0.85,
        width: width * 0.85,
        backgroundColor: '#2B1751',

    },
});



export default index;
