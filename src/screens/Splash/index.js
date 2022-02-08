import React, { useEffect } from "react";
import { View, Image,Dimensions,Text } from "react-native";
import { Images } from "../../Constants/Index";
import EncryptedStorage from "react-native-encrypted-storage";
import Background from "../../Components/Background";
import { IsVerified } from "../../Constants/Functions";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
export default function index({ navigation }) {
  // useEffect(() => {
  //   const Check = async () => {
  //     try {
  //       var Token = await EncryptedStorage.getItem("Token");
  //       if (Token !== null) {
  //         if (await IsVerified(Token)) {
  //          // return navigation.replace("BottomTabStack"); 
  //         }
  //       }
  //     //  await EncryptedStorage.clear();
  //     //  return navigation.replace("LoginStack");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   Check();
  // });
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {/* <ActivityIndicator size="large" color="#000" /> 
      <Text>hiiiii</Text> */}
       <Background height={1} design />
       <Image source={Images.Logo} style={{
           width: width * 0.5,
           height: height * 0.3,
           resizeMode: "contain",
       }} />
       <Text style={{color:'#fff',fontFamily:'Axiforma-Bold',fontSize:RFValue(35)}}>
        WINJOY
       </Text>
    </View>
  );
}
