import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { ChanceCard } from "../../Components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const index = ({props,navigation}) => {
    return (
        <SafeAreaView>
            <BackgroundRound height={0.3} />
            <View style={{ height: 20 }} />
            <Header />
            <Label primary font={16} bold dark style={{ color: "#ffff", }}>
                Don’t Miss a chace to
            </Label>
            <Label primary font={16} bold dark style={{ color: "#ffff", }}>
                win great deals
            </Label>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <LongButton style={styles.Margin}
                    textstyle={{ color: '#000000' }}
                    text="All"
                    font={16}
                />
                <LongButton style={[styles.Margin, { backgroundColor: null, borderWidth: 2, borderColor: '#ffffff' }]}
                    textstyle={{ color: '#ffffff' }}
                    text="Closing Soon"
                    font={16}
                    shadowless
                />
            </View>
           <TouchableWithoutFeedback 
           onPress={()=>navigation.navigate("ProductDetail")}>
           <ChanceCard/>
           <ChanceCard/>
           </TouchableWithoutFeedback>
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Margin: {
        height: height*0.06,
        width: width * 0.4,
        backgroundColor: '#ffffff',

    },
});



export default index;
