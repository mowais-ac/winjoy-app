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
  Text
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
import { strings } from "../../i18n";
import I18n from 'react-native-i18n';
import { getProducts } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
//I18n.locale="ar";
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
  // const [productData, setProductData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const productsData = useSelector(state => state?.app?.productsData);
  const [headerValue, setHeaderValue] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(isClosing));
    console.log("productsData", productsData);
    // setProductData(productsData?.data[0]);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProducts(isClosing));
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <BackgroundRound height={0.3} />
      <Header style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
        width: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
      }} />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <Label primary font={16} bold dark style={{ color: "#ffff", marginTop: height * 0.07 }}>
          {strings("products.do_not_miss_chance")}
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
            onPress={() => {
              setIsClosing(false);
              dispatch(getProducts(false));
              setUpdateData(!updateData)
              console.log("productsData1", productsData);
            }}
            style={[styles.Margin,
            { backgroundColor: !isClosing ? "#fff" : null, borderWidth: isClosing ? 2 : null, borderColor: isClosing ? "#ffffff" : null }
            ]}
            textstyle={{ color: isClosing ? "#fff" : "#000000" }}
            text={"All " + "(" + productsData?.data?.length + ")"}
            font={16}
            shadowless
          />
          <LongButton
            onPress={() => { 
              setIsClosing(true);
              dispatch(getProducts(true));
              setUpdateData(!updateData)
              console.log("productsData2", productsData);
            }}
            style={[
              styles.Margin,
              { backgroundColor: isClosing ? "#fff" : null, borderWidth: 2, borderColor: "#ffffff" },
            ]}
            textstyle={{ color: isClosing ? "#000000" : "#ffffff" }}
            text={strings("products.closing_soon")}
            font={16}
            shadowless
          />
        </View>
        <View>
          {/* onPress={()=>navigation.navigate("SimpeStackScreen",{screen:"ProductDetail"})}> */}
          

                <FlatList
                  data={productsData?.data}
                  scrollEnabled={false}
                  extraData={updateData}
                  renderItem={({ item }) => (
                    
                    <ChanceCard 
                    title={item.title}
                    updated_stocks={item?.updated_stocks}
                    stock={item?.stock}
                    image={item?.image}
                    description={item?.description}
                    price={item?.price}
                    data={item}
                      onPress={() =>
                        // console.log("item.item",item.item)
                        navigation.navigate("ProductDetail", { data: item })
                      }
                    />
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => (
                      <Text style={{ color: '#000000',top:100,textAlign:'center',width:width }}>The list is empty</Text>
                    )
                    }
                  
                  contentContainerStyle={{
                    paddingBottom: height * 0.48,
                  }}

                />
             
       
        </View>
      </ScrollView>
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
