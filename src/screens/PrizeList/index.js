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
import { strings } from "../../i18n";
import I18n from 'react-native-i18n';
import { getProducts } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
//I18n.locale="ar";
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
  // const [productData, setProductData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const productsData = useSelector(state => state?.app?.productsData);
  const [headerValue, setHeaderValue] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    console.log("productsData", productsData);
    // setProductData(productsData?.data[0]);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProducts());
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
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
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
            style={styles.Margin}
            textstyle={{ color: "#000000" }}
            text={"All " + "(" + productsData?.data?.length + ")"}
            font={16}
          />
          <LongButton
            style={[
              styles.Margin,
              { backgroundColor: null, borderWidth: 2, borderColor: "#ffffff" },
            ]}
            textstyle={{ color: "#ffffff" }}
            text={strings("products.closing_soon")}
            font={16}
            shadowless
          />
        </View>
        <View>
          {/* onPress={()=>navigation.navigate("SimpeStackScreen",{screen:"ProductDetail"})}> */}
          {/* {productsData?.data?.length === 0 ? (
            <ActivityIndicator size="large" color={Colors.BLACK} />
          ) : (
            <>
              {productsData?.data?.length >= 1 && (

                <FlatList
                  data={productsData?.data}
                  scrollEnabled={false}
                  renderItem={(item) =>
                    <ChanceCard data={item}
                      onPress={() =>
                        // console.log("item.item",item.item)
                      navigation.navigate("ProductDetail", { data: item.item })
                      }
                    />}
                  keyExtractor={(e) => e.id.toString()}
                  contentContainerStyle={{
                    paddingBottom: height * 0.48,
                  }} />
              )}
            </>
          )} */}
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
