import React, { useRef } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

import { Images, Colors } from "../Constants/Index";
import Label from "./Label";
import LongButton from "./LongButton";
import AddConnectionModal from "./AddConnectionModal";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const NotFoundCart = (props) => {
  const ConModalRef = useRef();
  const navigation = useNavigation();
  return (
    <View style={{alignItems:'center'}}>
      <Image source={require('../assets/imgs/CartEmptyList.png')} style={styles.Img} />
      <Label primary bold headingtype="h2" style={styles.Heading}>
        Your Cart is Empty
      </Label>
    
      <View style={styles.SmallBorder} />
     <Label dark style={styles.Info}>
      We’ve got some great campaigns at the moment! Let’s get shopping!
      </Label>
      <View style={styles.SmallBorder} />
    
         
          <AddConnectionModal ModalRef={ConModalRef} DisplayAlert />
          <LongButton
            text={"Get Shopping"}
            textstyle={{color:'#ffffff',fontFamily:'Axiforma-Bold'}}
            style={styles.Btn}
            shadowless
            onPress={() => {alert("test")}}
          />
 
  
    </View>
  );
};

const styles = StyleSheet.create({
  Img: {
    marginTop: height * 0.03,
    resizeMode: "contain",
    width: width * 0.25,
    height: height * 0.1,
    alignSelf: "center",
  },
  Heading: {
    marginTop: height * 0.02,
    color:"#420E92"
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color:"#000000",
    marginTop:height*0.02
  },
  SmallBorder: {
    width: width * 0.15,
    height: 2,
    backgroundColor: "#420E92",
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  HeadingQuestion: {
    marginTop: height * 0.02,
    color:"red"
  },
  Btn: {
    marginTop: height * 0.02,
    backgroundColor: "#420E92",
  },
});

export default NotFoundCart;
