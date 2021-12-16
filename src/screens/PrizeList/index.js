import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { ChanceCard } from "../../Components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import EncryptedStorage from "react-native-encrypted-storage"; 
import Config from "react-native-config";
import axios from 'axios';
import { wait } from "../../Constants/Functions";
import Colors from "../../Constants/Colors"; 
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
  const [productData, setProductData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // useEffect(async () => {
  
  // });
  useEffect(() => {
    GetData();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setProductData([]);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const GetData = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {                              
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios
      .get(`${Config.API_URL}/products/list`, requestOptions)
      .then((response) => {
        let res = response;`  `
        console.log("resPro",res.data);
        setProductData(res?.data?.data[0]);
      });
  };
  return (
    <SafeAreaView>
      <BackgroundRound height={0.3} />
      <View style={{ height: 20 }} />
      <Header />
      <Label primary font={16} bold dark style={{ color: "#ffff" }}>
        Don’t Miss a chace to
      </Label>
      <Label primary font={16} bold dark style={{ color: "#ffff" }}>
        win great deals
      </Label>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <LongButton
          style={styles.Margin}
          textstyle={{ color: "#000000" }}
          text={"All "+"("+productData.length+")"}
          font={16}
        />
        <LongButton
          style={[ 
            styles.Margin,
            { backgroundColor: null, borderWidth: 2, borderColor: "#ffffff" },
          ]}
          textstyle={{ color: "#ffffff" }}
          text="Closing Soon"
          font={16}
          shadowless
        />
      </View>
      <View>
        {/* onPress={()=>navigation.navigate("SimpeStackScreen",{screen:"ProductDetail"})}> */}
        {productData.length === 0 ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <>
          {productData.length >= 1 && (
      
            <FlatList
            data={productData}
            renderItem={(item)=>
            <ChanceCard data={item}
            onPress={()=>
             // console.log("item.item",item.item)
              navigation.navigate("ProductDetail",{data:item.item}) 
            }
            />}
            keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              paddingBottom: height * 0.48,
            }}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
          />
          )}
          </>
          )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: "#ffffff",
  },
});

export default index;
