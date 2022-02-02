import React, { useState,useEffect } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { widthConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import LongButton from "../LongButton";
import EncryptedStorage from "react-native-encrypted-storage";
const { width, height } = Dimensions.get("window");
import { useTranslation } from 'react-i18next';
//I18n.locale="ar";
function WalletBlanceCard({ yourBalance, onPress, onPressWithdraw, result, optionDisable, data }) {
 
 const [Data, setData] = useState(null);
 const [walletBalance, setWalletBalance] = useState(0);

   useEffect(() => {
   
    const check = async () => {
     
      if (Data === null) {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };

        await fetch(`${Config.API_URL}/wallet`, requestOptions)
          .then(async (response) => response.json())
          .then(async (res) => {
              console.log({"res":res})
              if(res.status === 'success' && res.wallet){
                setWalletBalance(res.wallet.your_balance) 
              // setWalletBalance(res.wallet.your_balancetoString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
              }
          })
      }
    };
   
    check();
  
  },[]);

  const { t } = useTranslation();
  return (

    <View
      style={{
        width: width - 25,
        height: height * 0.19,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        top: height * 0.06,
        left: 2,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        marginBottom:height,
      }}
    >
     
    <View style={{marginLeft:30}}>
    <Label notAlign primary font={14} bold2 style={{ color: "#E7003F",  }}>
    {t("your_wallet")}
      </Label>
<Label notAlign primary bold2  font={14} dark style={{ color: "#000000" }}>
AED {walletBalance}
</Label>
    </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          width:widthConverter(350)
        }}
      >
        {/* <LongButton
          style={styles.Margin}
          textstyle={{ color: "#eb2b5f" }}
          text={t("top_up")}
          font={16}
        /> */}
        <LongButton
          style={[
            styles.Margin,
            { backgroundColor: "#e3dbef"},
          ]}
          textstyle={{ color: "#420e92" }}
          text={t("with_draw")}
          font={16} 
          onPress={onPressWithdraw}
     
        />
      </View>

    </View>
  );
}

export { WalletBlanceCard };
